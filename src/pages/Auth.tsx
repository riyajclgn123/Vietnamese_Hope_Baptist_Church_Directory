import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock PIN for demo - in real app this would be handled by backend
  const CORRECT_PIN = "VHNBC";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (pin === CORRECT_PIN) {
      toast({
        title: "Access Granted",
        description: "Welcome to VNHBC Directory!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect PIN. Please try again.",
        variant: "destructive",
      });
      setPin("");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-elegant animate-scale-in">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              VNHBC Directory Access
            </CardTitle>
            <p className="text-muted-foreground">
              Enter your PIN to access the church member directory
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="pin" className="text-sm font-medium text-primary">
                  Security PIN
                </label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter your PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>
              
              <Button
                type="submit"
                variant="church"
                className="w-full text-lg py-6"
                disabled={isLoading || !pin}
              >
                {isLoading ? "Verifying..." : "Access Directory"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;