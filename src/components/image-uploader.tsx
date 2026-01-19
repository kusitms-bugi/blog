"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Copy, Check, Image as ImageIcon } from "lucide-react";

interface UploadedImage {
  url: string;
  fileName: string;
}

interface ImageUploaderProps {
  password: string;
}

export default function ImageUploader({ password }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 업로드 처리
  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다!");
      return;
    }

    // 파일 크기 체크 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다!");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${password}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("업로드 실패");
      }

      const data = await response.json();

      // 업로드된 이미지 설정
      const newImage: UploadedImage = {
        url: data.url,
        fileName: data.fileName,
      };
      setUploadedImage(newImage);

      // 자동으로 URL 복사
      await copyToClipboard(data.url);
    } catch (error) {
      console.error("업로드 에러:", error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await uploadFile(files[0]); // 첫 번째 파일만 업로드
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      await uploadFile(files[0]); // 첫 번째 파일만 업로드
    }
    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 클립보드 복사
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("복사 실패:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 업로드 영역 */}
      <Card
        className={`border-2 border-dashed transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div
              className={`rounded-full p-4 ${
                isDragging ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <Upload
                className={`h-8 w-8 ${
                  isDragging ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {isDragging
                  ? "여기에 놓으세요!"
                  : "이미지를 드래그 앤 드롭하세요"}
              </h3>
              <p className="text-sm text-muted-foreground">
                또는 버튼을 클릭해서 파일을 선택하세요
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, GIF, WebP (최대 10MB)
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              size="lg"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              {isUploading ? "업로드 중..." : "파일 선택"}
            </Button>
          </div>
        </div>
      </Card>

      {/* 업로드된 이미지 */}
      {uploadedImage && (
        <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Check className="h-5 w-5" />
              <h3 className="font-semibold">업로드 완료! ✅</h3>
            </div>

            {/* 이미지 미리보기 */}
            <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg bg-muted">
              <img
                src={uploadedImage.url}
                alt="블로그 썸네일"
                className="w-full h-auto"
              />
            </div>

            {/* GitHub Raw URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                GitHub Raw URL (Notion에 붙여넣기)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={uploadedImage.url}
                  readOnly
                  className="flex-1 rounded-md border bg-white dark:bg-gray-950 px-3 py-2 text-sm"
                  onClick={(e) => e.currentTarget.select()}
                />
                <Button
                  size="lg"
                  onClick={() => copyToClipboard(uploadedImage.url)}
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      복사됨!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      복사
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* 다시 업로드 버튼 */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setUploadedImage(null);
                setIsCopied(false);
              }}
            >
              다른 이미지 업로드
            </Button>
          </div>
        </Card>
      )}

      {/* 안내 메시지 */}
      {!uploadedImage && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20">
          <div className="p-4 space-y-2">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">
              💡 사용 방법
            </h4>
            <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
              <li>썸네일 이미지 1장을 업로드하세요</li>
              <li>GitHub Raw URL이 자동으로 복사됩니다</li>
              <li>Notion의 "Featured Image"에 붙여넣으세요</li>
              <li>
                아래 <strong>"Git Push 실행"</strong> 버튼을 꼭 클릭하세요!
              </li>
            </ol>
          </div>
        </Card>
      )}
    </div>
  );
}
