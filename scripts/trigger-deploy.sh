#!/bin/bash

# Vercel Deploy Hook URL (여기에 생성한 URL 입력)
DEPLOY_HOOK_URL="https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_URL_HERE"

echo "🚀 Vercel 재배포 트리거 중..."
curl -X POST "$DEPLOY_HOOK_URL"
echo ""
echo "✅ 재배포 요청 완료!"
echo "📊 Vercel 대시보드에서 진행 상황을 확인하세요."
