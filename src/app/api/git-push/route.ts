import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // 비밀번호 확인
    const adminPassword = process.env.ADMIN_PASSWORD;
    const { password } = await request.json();

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // Git 명령어 실행
    try {
      // 변경사항 확인
      const { stdout: statusOutput } = await execAsync("git status --porcelain");
      
      if (!statusOutput.trim()) {
        return NextResponse.json({
          success: false,
          message: "커밋할 변경사항이 없습니다.",
        });
      }

      // Git add
      await execAsync("git add public/images/*");

      // Git commit
      const timestamp = new Date().toISOString();
      await execAsync(
        `git commit -m "이미지 업로드: ${timestamp}"`
      );

      // Git push
      await execAsync("git push origin main");

      return NextResponse.json({
        success: true,
        message: "Git Push가 성공적으로 완료되었습니다!",
      });
    } catch (gitError: any) {
      console.error("Git 명령어 에러:", gitError);
      return NextResponse.json(
        {
          error: "Git 작업 중 오류가 발생했습니다.",
          details: gitError.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Git push 에러:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
