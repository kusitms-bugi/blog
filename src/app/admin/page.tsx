"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, Check, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleDeploy = async () => {
    if (!password) {
      setStatus("error");
      setMessage("비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "재배포가 시작되었습니다!");
        setPassword(""); // 비밀번호 초기화
      } else {
        setStatus("error");
        setMessage(data.error || "재배포 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("서버 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleDeploy();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">🛠️ 관리자 페이지</CardTitle>
          <CardDescription>
            Notion에서 글을 작성한 후 여기서 재배포하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              관리자 비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleDeploy}
            disabled={isLoading || !password}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                재배포 중...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                지금 재배포
              </>
            )}
          </Button>

          {status === "success" && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 p-3 rounded-md">
              <Check className="h-5 w-5" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 p-3 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
            <p>📝 <strong>사용 방법:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Notion에서 글 작성</li>
              <li>상태를 "Published"로 변경</li>
              <li>비밀번호 입력 후 재배포 버튼 클릭</li>
              <li>약 1-2분 후 블로그에 반영됨</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
