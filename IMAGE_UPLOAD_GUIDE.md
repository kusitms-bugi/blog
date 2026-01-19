# 📸 이미지 업로드 가이드

---

## 🚀 빠른 시작

```
1. https://blog.bugi.co.kr/admin 접속
2. 비밀번호 입력 (gbgr260116)
3. "이미지 업로드" 탭 클릭
4. 이미지를 드래그 앤 드롭
5. URL 자동 복사됨! ✅
6. "Git Push 실행" 버튼 클릭
7. Notion에 붙여넣기
```

---

## ✨ 주요 기능

### 1. 드래그 앤 드롭
```
✅ 파일 탐색기에서 드래그 앤 드롭
✅ 여러 파일 동시 업로드
✅ 실시간 미리보기
✅ 자동 URL 복사
```

### 2. 지원 형식
```
✅ JPG / JPEG
✅ PNG
✅ GIF
✅ WebP
```

**파일 크기:** 최대 10MB

### 3. 자동 최적화
```
- 파일명: 타임스탬프 + 원본 이름
- 특수문자 자동 제거
- 중복 방지
```

---

## 📝 상세 사용법

### Step 1: 관리자 페이지 접속

**URL:**
```
https://blog.bugi.co.kr/admin
```

**비밀번호:**
```
gbgr260116
```

---

### Step 2: 이미지 업로드

#### 방법 A: 드래그 앤 드롭 (추천 ⭐)

1. 업로드 영역이 보일 때까지 스크롤
2. 파일 탐색기에서 이미지 선택
3. 업로드 영역으로 드래그
4. 놓기!
5. URL 자동 복사됨 ✅

#### 방법 B: 파일 선택

1. "파일 선택" 버튼 클릭
2. 파일 탐색기에서 이미지 선택
3. "열기" 클릭
4. URL 자동 복사됨 ✅

#### 방법 C: 여러 파일 동시 업로드

1. Ctrl/Cmd 누른 채로 여러 파일 선택
2. 드래그 앤 드롭
3. 순차적으로 업로드됨
4. 각 URL이 차례대로 복사됨

---

### Step 3: Git Push (중요! ⚠️)

**반드시 필요합니다!**

이미지는 `public/images/` 폴더에 저장되므로, Git에 커밋하고 푸시해야 블로그에 반영됩니다.

#### 관리자 페이지에서 (추천)

```
1. 이미지 업로드 완료 후
2. 아래로 스크롤
3. "Git Push 실행" 버튼 클릭
4. 완료!
```

#### 로컬에서 (개발자용)

```bash
cd /Users/choiho/coding/gbgr/blog
git add public/images/*
git commit -m "이미지 업로드: 설명"
git push origin main
```

---

### Step 4: Notion에서 사용

#### 커버 이미지 (Featured Image)

1. Notion 데이터베이스에서 포스트 열기
2. "Featured Image" 필드 클릭
3. 복사한 URL 붙여넣기
   ```
   https://blog.bugi.co.kr/images/1234567890-image.jpg
   ```

#### 본문 이미지

**방법 1: 마크다운 (추천)**

```markdown
![이미지 설명](https://blog.bugi.co.kr/images/1234567890-image.jpg)
```

**방법 2: Notion 이미지 블록**

```
1. /image 입력
2. "Link" 선택
3. URL 붙여넣기
```

---

## 💡 팁 & 트릭

### 1. 파일명 규칙

**업로드 전:**
```
my-awesome-photo.jpg
```

**업로드 후:**
```
1737345678901-my-awesome-photo.jpg
```

**URL:**
```
https://blog.bugi.co.kr/images/1737345678901-my-awesome-photo.jpg
```

### 2. 썸네일 최적화

**권장 사이즈:**
```
- 블로그 커버: 1200 x 630px (Open Graph)
- 포스트 카드: 800 x 400px
- 본문 이미지: 800px 너비
```

**용량:**
```
- 커버 이미지: 500KB 이하
- 본문 이미지: 300KB 이하
```

**도구 추천:**
- [TinyPNG](https://tinypng.com/) - PNG/JPG 압축
- [Squoosh](https://squoosh.app/) - 다양한 형식 변환
- Photoshop / Figma - 전문 편집

### 3. 여러 이미지 관리

**시나리오:** 포스트에 10개 이미지 사용

**효율적인 방법:**
```
1. 모든 이미지를 한 번에 드래그 앤 드롭
2. 각 URL이 순차적으로 복사됨
3. 메모장에 붙여넣으며 수집
4. 마지막에 Git Push 한 번만
5. Notion에서 일괄 사용
```

### 4. URL 재복사

업로드 후 URL을 잃어버렸다면:

```
1. 업로드된 이미지 목록에서 찾기
2. URL 옆 "복사" 아이콘 클릭
3. 다시 복사됨! ✅
```

### 5. 이미지 삭제

**목록에서 제거:** (파일은 유지)
```
이미지 카드 우측 X 버튼 클릭
```

**실제 파일 삭제:**
```bash
# 로컬에서
rm public/images/파일명.jpg
git add public/images/*
git commit -m "이미지 삭제"
git push
```

---

## 🔧 고급 활용

### 1. 이미지 URL 패턴

**로컬 개발:**
```
http://localhost:3000/images/1234-image.jpg
```

**프로덕션:**
```
https://blog.bugi.co.kr/images/1234-image.jpg
```

**환경 변수 설정:**
```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://blog.bugi.co.kr
```

### 2. CDN 속도 최적화

Vercel이 자동으로 CDN 캐싱을 제공합니다:

```
✅ 전 세계 Edge Network
✅ 자동 Gzip 압축
✅ HTTP/2 지원
✅ 빠른 로딩 속도
```

### 3. 반응형 이미지

Next.js Image 컴포넌트가 자동 최적화:

```tsx
<Image
  src="/images/1234-image.jpg"
  alt="설명"
  width={800}
  height={400}
/>
```

---

## ❓ 문제 해결

### Q1: 이미지가 업로드되지 않아요!

**확인 사항:**
1. 파일이 이미지 형식인가? (JPG, PNG, GIF, WebP)
2. 파일 크기가 10MB 이하인가?
3. 비밀번호가 맞나?
4. 인터넷 연결 상태는?

**해결 방법:**
```
1. 브라우저 콘솔 확인 (F12)
2. 다른 브라우저 시도
3. 파일 크기 줄이기 (TinyPNG)
```

---

### Q2: URL을 복사했는데 이미지가 안 보여요!

**원인:** Git Push를 하지 않았을 가능성

**해결:**
```
1. 관리자 페이지에서 "Git Push 실행" 클릭
2. 1-2분 대기
3. 페이지 새로고침
```

---

### Q3: Git Push가 실패해요!

**일반적인 원인:**

**1. 변경사항 없음**
```
→ 이미 push되었거나 업로드한 이미지가 없음
→ 확인: 업로드된 이미지 목록 체크
```

**2. Git 인증 문제**
```
→ SSH 키 또는 토큰 설정 필요
→ 해결: 로컬에서 수동 push
```

**수동 Push:**
```bash
cd /Users/choiho/coding/gbgr/blog
git add public/images/*
git commit -m "이미지 업로드"
git push origin main
```

---

### Q4: 업로드한 이미지를 삭제하고 싶어요!

**목록에서만 제거:**
```
이미지 카드의 X 버튼 클릭
(파일은 서버에 남아있음)
```

**완전 삭제:**
```bash
# 로컬 터미널에서
rm public/images/1234567890-image.jpg
git add public/images/*
git commit -m "불필요한 이미지 삭제"
git push origin main
```

---

### Q5: 같은 파일을 다시 업로드하면?

**자동으로 다른 이름으로 저장됩니다:**

```
첫 번째: 1737345678901-photo.jpg
두 번째: 1737345679999-photo.jpg (타임스탬프 다름)
```

중복 걱정 없음! ✅

---

## 🎯 워크플로우 예시

### 시나리오: 새 블로그 포스트 작성

#### 1단계: 이미지 준비
```
- 커버 이미지: cover.jpg (1200x630)
- 스크린샷 1: screenshot1.png
- 스크린샷 2: screenshot2.png
- 다이어그램: diagram.png
```

#### 2단계: 이미지 업로드
```
1. admin 페이지 접속
2. 이미지 업로드 탭
3. 4개 파일 모두 드래그 앤 드롭
4. URL들을 메모장에 복사
```

#### 3단계: Git Push
```
1. "Git Push 실행" 클릭
2. 성공 메시지 확인
```

#### 4단계: Notion에서 작성
```
1. 새 페이지 생성
2. Title: "Next.js로 블로그 만들기"
3. Featured Image: [커버 이미지 URL]
4. 본문 작성하며 이미지 삽입:
   ![스크린샷](https://blog.bugi.co.kr/images/xxx1.png)
   ![다이어그램](https://blog.bugi.co.kr/images/xxx2.png)
5. Status: Published
```

#### 5단계: 블로그 배포
```
1. "재배포" 탭으로 이동
2. "지금 재배포" 클릭
3. 1-2분 대기
4. https://blog.bugi.co.kr 확인
```

**완료! 🎉**

---

## 📊 통계 & 제한

### 무료 호스팅 (GitHub + Vercel)

```
✅ 용량: 무제한 (Git LFS 없이)
✅ 대역폭: 100GB/월 (Vercel 무료)
✅ 빌드: 100시간/월
✅ 이미지 최적화: 자동
```

### 권장 사항

**총 이미지 용량:**
```
- 적정: 10-50MB
- 최대: 100MB
- 초과 시: Git LFS 고려
```

**포스트당 이미지:**
```
- 커버: 1개 (필수)
- 본문: 5-10개 (권장)
- 최대: 제한 없음
```

---

## 🔐 보안

### 인증

**관리자 페이지:**
```
비밀번호 인증 필요
→ ADMIN_PASSWORD 환경 변수
→ API 요청마다 확인
```

**업로드 API:**
```
Authorization: Bearer {password}
→ 401 Unauthorized (비밀번호 틀림)
→ 200 OK (성공)
```

### 파일 검증

```
✅ 이미지 MIME 타입 확인
✅ 파일 크기 제한 (10MB)
✅ 파일명 특수문자 제거
✅ 경로 traversal 방지
```

---

## 🚀 향후 개선 (TODO)

- [ ] 이미지 리사이징 자동화
- [ ] WebP 자동 변환
- [ ] 썸네일 생성
- [ ] 이미지 갤러리 보기
- [ ] 드래그 앤 드롭으로 순서 변경
- [ ] 이미지 메타데이터 편집
- [ ] Alt 텍스트 자동 생성 (AI)
- [ ] 일괄 삭제 기능

---

## 📞 도움말

**문제가 발생하면:**
1. 브라우저 콘솔 확인 (F12 → Console)
2. Network 탭에서 실패한 요청 확인
3. Vercel 로그 확인
4. GitHub Issues 등록

**연락처:**
- GitHub: @kusitms-bugi
- 블로그: https://blog.bugi.co.kr

---

## ✅ 요약

```bash
# 가장 중요한 3단계
1. 이미지 드래그 앤 드롭 → URL 자동 복사
2. "Git Push 실행" 버튼 클릭
3. Notion에 붙여넣기 → 완료!
```

**Happy Blogging! 🎉**
