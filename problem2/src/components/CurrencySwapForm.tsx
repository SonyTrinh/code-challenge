import React, { useState, useEffect } from "react";
import { ArrowUpDown, AlertCircle, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePrices } from "@/hooks/usePrices";
import { useExchangeCalculation } from "@/hooks/useExchangeCalculation";
import { SwapFormData, TokenInfo } from "@/types";

const TokenOption: React.FC<{ token: TokenInfo }> = ({ token }) => (
  <div className="flex items-center justify-between w-[350px]">
    <div className="flex items-center gap-2">
      <img
        src={token.logoURI}
        alt={token.symbol}
        className="w-6 h-6 rounded-full"
      />
      <div className="flex flex-col items-start">
        <span className="font-medium">{token.symbol}</span>
        <span className="text-xs text-muted-foreground">{token.name}</span>
      </div>
    </div>
    <div className="ml-auto text-right">
      <div className="text-sm font-medium">${token.price.toFixed(4)}</div>
    </div>
  </div>
);

const CurrencySwapForm: React.FC = () => {
  const { tokens, loading, error, calculateExchangeAmount, getTokenPrice } =
    usePrices();

  const [formData, setFormData] = useState<SwapFormData>({
    fromToken: "",
    toToken: "",
    fromAmount: "",
    toAmount: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toAmount, isCalculating, calculationError } = useExchangeCalculation({
    fromToken: formData.fromToken,
    toToken: formData.toToken,
    fromAmount: formData.fromAmount,
    calculateExchangeAmount,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, toAmount }));
  }, [toAmount]);

  useEffect(() => {
    if (calculationError) {
      setErrors((prev) => ({ ...prev, fromAmount: calculationError }));
    } else {
      setErrors((prev) => ({ ...prev }));
    }
  }, [calculationError]);

  const handleInputChange = (field: keyof SwapFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSwapTokens = () => {
    setFormData((prev) => ({
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fromToken) {
      newErrors.fromToken = "Please select a token to swap from";
    }
    if (!formData.toToken) {
      newErrors.toToken = "Please select a token to swap to";
    }
    if (formData.fromToken === formData.toToken) {
      newErrors.toToken = "Cannot swap to the same token";
    }
    if (!formData.fromAmount) {
      newErrors.fromAmount = "Please enter an amount";
    } else {
      const amount = parseFloat(formData.fromAmount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.fromAmount = "Please enter a valid amount greater than 0";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClearData = () => {
    setFormData({
      fromToken: "",
      toToken: "",
      fromAmount: "",
      toAmount: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      alert(
        `Swap submitted!\nFrom: ${formData.fromAmount} ${formData.fromToken}\nTo: ${formData.toAmount} ${formData.toToken}`
      );
    }
    handleClearData();
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading tokens...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-destructive">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Currency Swap
        </CardTitle>
        <CardDescription>
          Swap between different cryptocurrencies with real-time pricing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* From Token Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <div className="space-y-2">
              <Select
                value={formData.fromToken}
                onValueChange={(value) => handleInputChange("fromToken", value)}
              >
                <SelectTrigger
                  className={errors.fromToken ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select token to swap from" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <TokenOption token={token} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fromToken && (
                <p className="text-sm text-destructive">{errors.fromToken}</p>
              )}

              <Input
                type="number"
                placeholder="0.00"
                value={formData.fromAmount}
                onChange={(e) =>
                  handleInputChange("fromAmount", e.target.value)
                }
                className={errors.fromAmount ? "border-destructive" : ""}
                step="any"
                min="0"
              />
              {errors.fromAmount && (
                <p className="text-sm text-destructive">{errors.fromAmount}</p>
              )}
              {formData.fromToken && (
                <div className="text-xs text-muted-foreground">
                  Price: ${getTokenPrice(formData.fromToken).toFixed(4)}
                </div>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center cursor-pointer">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSwapTokens}
              disabled={!formData.fromToken || !formData.toToken}
              className="rounded-full"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* To Token Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <div className="space-y-2">
              <Select
                value={formData.toToken}
                onValueChange={(value) => handleInputChange("toToken", value)}
              >
                <SelectTrigger
                  className={errors.toToken ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select token to receive" />
                </SelectTrigger>
                <SelectContent className="min-w-0">
                  {tokens.map((token) => (
                    <SelectItem
                      key={token.symbol}
                      value={token.symbol}
                      className="w-full"
                    >
                      <TokenOption token={token} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.toToken && (
                <p className="text-sm text-destructive">{errors.toToken}</p>
              )}

              <div className="relative">
                <Input
                  type="text"
                  placeholder="0.00"
                  value={formData.toAmount}
                  readOnly
                  className="bg-muted"
                />
                {isCalculating && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  </div>
                )}
              </div>
              {formData.toToken && (
                <div className="text-xs text-muted-foreground">
                  Price: ${getTokenPrice(formData.toToken).toFixed(4)}
                </div>
              )}
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm">
              <div className="flex justify-between">
                <span>Exchange Rate:</span>
                {formData.fromToken &&
                formData.toToken &&
                formData.fromAmount &&
                formData.toAmount ? (
                  <span className="font-bold">
                    1 {formData.fromToken} ={" "}
                    {calculateExchangeAmount(
                      formData.fromToken,
                      formData.toToken,
                      1
                    ).toFixed(6)}{" "}
                    {formData.toToken}
                  </span>
                ) : (
                  <span className="font-bold">--</span>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={
              !formData.fromToken ||
              !formData.toToken ||
              !formData.fromAmount ||
              Object.keys(errors).length > 0
            }
            onClick={handleSubmit}
          >
            Swap Tokens
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CurrencySwapForm;
