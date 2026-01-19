import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 간단한 보안 체크 (선택사항)
    const { password } = await request.json();
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // Vercel Deploy Hook 호출
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK;
    
    if (!deployHookUrl) {
      return NextResponse.json(
        { error: "Deploy Hook URL이 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const response = await fetch(deployHookUrl, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Deploy hook 호출 실패");
    }

    return NextResponse.json({
      success: true,
      message: "재배포가 시작되었습니다!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Deploy error:", error);
    return NextResponse.json(
      { error: "재배포 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
