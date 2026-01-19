import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    // 비밀번호 확인
    const adminPassword = process.env.ADMIN_PASSWORD;
    const authHeader = request.headers.get("authorization");

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "인증 실패" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다" }, { status: 400 });
    }

    // 파일 이름 생성 (타임스탬프 + 확장자)
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const fileName = `thumbnail-${timestamp}.${extension}`;

    // 파일을 버퍼로 변환
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // public/images 폴더에 저장
    const uploadPath = path.join(process.cwd(), "public", "images", fileName);
    await writeFile(uploadPath, buffer);

    // GitHub raw URL 생성
    const githubRawUrl = `https://raw.githubusercontent.com/kusitms-bugi/blog/main/public/images/${fileName}`;

    return NextResponse.json({
      success: true,
      url: githubRawUrl,
      fileName: fileName,
      message: "이미지가 성공적으로 업로드되었습니다!",
    });
  } catch (error) {
    console.error("이미지 업로드 에러:", error);
    return NextResponse.json(
      { error: "이미지 업로드 실패" },
      { status: 500 }
    );
  }
}
