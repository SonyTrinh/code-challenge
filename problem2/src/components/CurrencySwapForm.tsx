import React, { useState, useEffect } from "react";
import { ArrowUpDown, AlertCircle, TrendingUp, Sparkles, Zap } from "lucide-react";
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
  <div className="flex items-center justify-between w-[350px] p-2 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="relative">
        <img
          src={token.logoURI}
          alt={token.symbol}
          className="w-6 h-6 rounded-full shadow-md"
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-gray-800">{token.symbol}</span>
        <span className="text-xs text-muted-foreground">{token.name}</span>
      </div>
    </div>
    <div className="ml-auto text-right">
      <div className="text-sm font-bold text-green-600">
        ${token.price.toFixed(4)}
      </div>
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
  const [isSwapping, setIsSwapping] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

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
    setIsSwapping(true);
    setTimeout(() => {
      setFormData((prev) => ({
        fromToken: prev.toToken,
        toToken: prev.fromToken,
        fromAmount: prev.toAmount,
        toAmount: "",
      }));
      setIsSwapping(false);
    }, 600);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setShowSuccessAnimation(true);
      
      // Simulate processing time
      setTimeout(() => {
        alert(
          `🎉 Swap completed successfully!\n\n📤 From: ${formData.fromAmount} ${formData.fromToken}\n📥 To: ${formData.toAmount} ${formData.toToken}\n\n✨ Transaction processed instantly!`
        );
        setShowSuccessAnimation(false);
        handleClearData();
      }, 2000);
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-2xl border-0">
        <CardContent className="flex flex-col items-center justify-center h-96 space-y-4">
          <div className="relative">
            <div className="rounded-full h-12 w-12 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-border"></div>
            <div className="absolute inset-2 bg-white rounded-full"></div>
            <div className="absolute inset-3 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-border"></div>
          </div>
          <div className="text-center">
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Loading Tokens...
            </span>
            <div className="flex justify-center mt-2 space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-red-50 via-white to-orange-50 shadow-2xl border-0">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <div className="relative">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <div className="absolute inset-0 h-12 w-12 border-2 border-red-300 rounded-full mx-auto"></div>
            </div>
            <div>
              <p className="text-lg font-semibold text-red-600 mb-2">Oops! Something went wrong</p>
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Processing Swap...</h3>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      
      <Card className="w-full max-w-md mx-auto shadow-2xl bg-gradient-to-br from-white via-blue-50 to-purple-50 border-0 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <CardHeader className="text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
          <CardTitle className="flex items-center justify-center gap-3 relative z-10">
            <div className="relative">
              <TrendingUp className="h-8 w-8 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Currency Swap
            </span>
          </CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            ✨ Swap cryptocurrencies with real-time pricing & lightning speed
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* From Token Section */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                From Token
              </label>
              <div className="space-y-3">
                <Select
                  value={formData.fromToken}
                  onValueChange={(value) => handleInputChange("fromToken", value)}
                >
                  <SelectTrigger
                    className={`${
                      errors.fromToken ? "border-red-500 shadow-red-200" : "border-gray-200"
                    } shadow-lg bg-white/80 backdrop-blur-sm`}
                  >
                    <SelectValue placeholder="🔍 Select token to swap from" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                    {tokens.map((token) => (
                      <SelectItem 
                        key={token.symbol} 
                        value={token.symbol}
                        className="cursor-pointer"
                      >
                        <TokenOption token={token} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fromToken && (
                  <p className="text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.fromToken}
                  </p>
                )}

                <div className="relative">
                  <Input
                    type="number"
                    placeholder="💰 Enter amount"
                    value={formData.fromAmount}
                    onChange={(e) =>
                      handleInputChange("fromAmount", e.target.value)
                    }
                    className={`${
                      errors.fromAmount ? "border-red-500 shadow-red-200" : "border-gray-200"
                    } shadow-lg bg-white/80 backdrop-blur-sm text-lg font-semibold`}
                    step="any"
                    min="0"
                  />
                </div>
                {errors.fromAmount && (
                  <p className="text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.fromAmount}
                  </p>
                )}
                {formData.fromToken && (
                  <div className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-lg">
                    💎 Current Price: <span className="font-bold text-green-600">${getTokenPrice(formData.fromToken).toFixed(4)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwapTokens}
                disabled={!formData.fromToken || !formData.toToken}
                className="rounded-full w-12 h-12 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUpDown className="h-5 w-5" />
              </Button>
            </div>

            {/* To Token Section */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                To Token
              </label>
              <div className="space-y-3">
                <Select
                  value={formData.toToken}
                  onValueChange={(value) => handleInputChange("toToken", value)}
                >
                  <SelectTrigger
                    className={`${
                      errors.toToken ? "border-red-500 shadow-red-200" : "border-gray-200"
                    } shadow-lg bg-white/80 backdrop-blur-sm`}
                  >
                    <SelectValue placeholder="🎯 Select token to receive" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                    {tokens.map((token) => (
                      <SelectItem
                        key={token.symbol}
                        value={token.symbol}
                        className="cursor-pointer"
                      >
                        <TokenOption token={token} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.toToken && (
                  <p className="text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.toToken}
                  </p>
                )}

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="💫 Calculated amount"
                    value={formData.toAmount}
                    readOnly
                    className="bg-gradient-to-r from-gray-50 to-blue-50 shadow-lg border-gray-200 text-lg font-bold text-purple-700"
                  />
                  {isCalculating && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"></div>
                        <div className="w-1 h-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"></div>
                        <div className="w-1 h-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
                {formData.toToken && (
                  <div className="text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg">
                    💎 Current Price: <span className="font-bold text-green-600">${getTokenPrice(formData.toToken).toFixed(4)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Exchange Rate */}
            <div className="p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-inner border border-gray-100">
              <div className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Exchange Rate:
                  </span>
                  {formData.fromToken &&
                  formData.toToken &&
                  formData.fromAmount &&
                  formData.toAmount ? (
                    <span className="font-bold text-md bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      1 {formData.fromToken} ={" "}
                      {calculateExchangeAmount(
                        formData.fromToken,
                        formData.toToken,
                        1
                      ).toFixed(6)}{" "}
                      {formData.toToken}
                    </span>
                  ) : (
                    <span className="font-bold text-gray-400">--</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border-0"
              disabled={
                !formData.fromToken ||
                !formData.toToken ||
                !formData.fromAmount ||
                Object.keys(errors).length > 0 ||
                showSuccessAnimation
              }
            >
              {showSuccessAnimation ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Swap Tokens
                  <Zap className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencySwapForm;
