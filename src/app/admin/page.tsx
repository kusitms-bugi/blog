"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  RefreshCw,
  Check,
  AlertCircle,
  Upload,
  GitBranch,
} from "lucide-react";
import ImageUploader from "@/components/image-uploader";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [pushMessage, setPushMessage] = useState("");

  // 비밀번호 확인
  const handleAuthenticate = () => {
    if (!password) {
      setStatus("error");
      setMessage("비밀번호를 입력해주세요.");
      return;
    }

    // 간단한 클라이언트 측 확인 (실제 확인은 API에서)
    setIsAuthenticated(true);
  };

  // 재배포
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

  // Git Push
  const handleGitPush = async () => {
    if (!password) {
      setPushStatus("error");
      setPushMessage("비밀번호를 입력해주세요.");
      return;
    }

    setIsPushing(true);
    setPushStatus("idle");
    setPushMessage("");

    try {
      const response = await fetch("/api/git-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setPushStatus("success");
        setPushMessage(
          data.message || "Git Push가 성공적으로 완료되었습니다!"
        );
      } else {
        setPushStatus("error");
        setPushMessage(data.error || "Git Push 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setPushStatus("error");
      setPushMessage("서버 오류가 발생했습니다.");
    } finally {
      setIsPushing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!isAuthenticated) {
        handleAuthenticate();
      } else {
        handleDeploy();
      }
    }
  };

  // 인증되지 않은 경우
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">🔐 관리자 인증</CardTitle>
            <CardDescription>
              관리자 비밀번호를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <Button
              onClick={handleAuthenticate}
              disabled={!password}
              className="w-full"
              size="lg"
            >
              로그인
            </Button>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 p-3 rounded-md">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // 인증된 경우
  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">🛠️ 관리자 페이지</h1>
          <p className="text-muted-foreground mt-2">
            블로그 관리 및 이미지 업로드
          </p>
        </div>

        <Tabs defaultValue="deploy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deploy">
              <RefreshCw className="mr-2 h-4 w-4" />
              재배포
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="mr-2 h-4 w-4" />
              이미지 업로드
            </TabsTrigger>
          </TabsList>

          {/* 재배포 탭 */}
          <TabsContent value="deploy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>📝 블로그 재배포</CardTitle>
                <CardDescription>
                  Notion에서 글을 작성한 후 여기서 재배포하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleDeploy}
                  disabled={isLoading}
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
                  <p>
                    📝 <strong>사용 방법:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Notion에서 글 작성</li>
                    <li>상태를 "Published"로 변경</li>
                    <li>재배포 버튼 클릭</li>
                    <li>약 1-2분 후 블로그에 반영됨</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 이미지 업로드 탭 */}
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>📸 이미지 업로드</CardTitle>
                <CardDescription>
                  블로그 썸네일 및 포스트 이미지를 업로드하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUploader password={password} />

                {/* Git Push 버튼 */}
                <div className="mt-6 pt-6 border-t space-y-4">
                  <h3 className="font-semibold">⚠️ 중요: 이미지 배포하기</h3>
                  <p className="text-sm text-muted-foreground">
                    이미지를 업로드한 후 반드시 Git Push를 해야 블로그에
                    반영됩니다.
                  </p>

                  <Button
                    onClick={handleGitPush}
                    disabled={isPushing}
                    className="w-full"
                    size="lg"
                    variant="outline"
                  >
                    {isPushing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Git Push 중...
                      </>
                    ) : (
                      <>
                        <GitBranch className="mr-2 h-4 w-4" />
                        Git Push 실행
                      </>
                    )}
                  </Button>

                  {pushStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 p-3 rounded-md">
                      <Check className="h-5 w-5" />
                      <p className="text-sm font-medium">{pushMessage}</p>
                    </div>
                  )}

                  {pushStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 p-3 rounded-md">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm font-medium">{pushMessage}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
