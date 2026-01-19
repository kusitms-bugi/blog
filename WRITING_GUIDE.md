# ✍️ 거부기린 블로그 - 글쓰기 가이드

---

## 🎯 전체 프로세스 (30초 요약)

```
1. Notion에서 글 작성
2. Status를 "Published"로 변경
3. https://blog.bugi.co.kr/admin 접속
4. 비밀번호 입력 후 "지금 재배포" 클릭
5. 1-2분 대기
6. 블로그에 글 표시 완료! ✅
```

---

## 📝 상세 플로우

### Step 1: Notion에서 글 작성

#### 1-1. Notion 데이터베이스 열기
```
https://cooing-diamond-a66.notion.site/2eb25d3f8c8b818f9086fd5f40378189
```

#### 1-2. 새 페이지 추가
- 데이터베이스에서 "+ New" 클릭
- 또는 빈 행 클릭

#### 1-3. 필수 항목 입력

| 항목 | 설명 | 예시 |
|------|------|------|
| **Title** | 글 제목 | Next.js로 블로그 만들기 |
| **Status** | 상태 | Draft (작성 중) |
| **Published Date** | 발행 날짜 | 2026-01-20 |

#### 1-4. 선택 항목 입력

| 항목 | 설명 | 예시 |
|------|------|------|
| Featured Image | 커버 이미지 URL | https://images.unsplash.com/... |
| Author | 작성자 | 최호 (자동) |
| Tags | 태그 (복수 선택) | Technology, Frontend |
| Category | 카테고리 (단일 선택) | Technology |
| Slug | 커스텀 URL (선택) | nextjs-blog-tutorial |

#### 1-5. 본문 작성
- Notion 페이지를 열어서 자유롭게 작성
- 마크다운 완벽 지원
- 이미지, 코드 블록, 표, 인용구 등 모두 사용 가능

**지원 기능:**
- ✅ 제목 (H1-H6)
- ✅ 볼드, 이탤릭, 취소선
- ✅ 링크
- ✅ 이미지
- ✅ 코드 블록 (Syntax Highlighting)
- ✅ 인용구
- ✅ 리스트 (순서/비순서)
- ✅ 테이블
- ✅ 구분선

---

### Step 2: 발행 준비

#### 2-1. 작성 완료 후 검토
- [ ] 오타 확인
- [ ] 이미지 확인 (정상 로딩)
- [ ] 링크 확인 (정상 작동)
- [ ] 코드 블록 확인

#### 2-2. Status 변경 ⭐ **가장 중요!**

```
Draft → Published
```

**주의:** Status가 "Published"가 아니면 블로그에 표시되지 않습니다!

#### 2-3. 최종 체크리스트

```
✅ Title 입력됨
✅ Status = Published
✅ Published Date 설정됨
✅ Category 선택 (선택사항)
✅ Tags 추가 (선택사항)
✅ 본문 작성 완료
```

---

### Step 3: 블로그 재배포

#### 방법 A: 관리자 페이지 (추천 ⭐)

**1. 관리자 페이지 접속**
```
https://blog.bugi.co.kr/admin
```

**2. 비밀번호 입력**
```
gbgr260116
```

**3. "지금 재배포" 버튼 클릭**
- 클릭 한 번으로 끝!
- "재배포가 시작되었습니다!" 메시지 확인

**4. 완료!**
- Vercel이 자동으로 빌드 시작
- 별도 작업 필요 없음

#### 방법 B: 로컬 스크립트

로컬 개발 환경에서:
```bash
npm run deploy
```

---

### Step 4: 빌드 대기

#### 4-1. Vercel 대시보드 (선택)
```
https://vercel.com/kusitms-bugi/blog
```

#### 4-2. 빌드 진행 상황

```
🔄 Building...     (30초-1분)
🔄 Deploying...    (30초)
✅ Ready!          (완료)
```

**총 소요 시간: 약 1-2분**

#### 4-3. 배포 완료 확인

Vercel 대시보드에서 "Ready" 상태 확인

---

### Step 5: 블로그 확인

#### 5-1. 홈페이지 접속
```
https://blog.bugi.co.kr
```

#### 5-2. 새 글 확인
- 최신 글이 상단에 표시됨
- 썸네일 이미지 확인
- 제목, 설명, 태그 확인

#### 5-3. 포스트 상세 확인
- 글 카드 클릭
- 본문 렌더링 확인
- 이미지 로딩 확인
- 코드 블록 하이라이팅 확인
- 댓글 시스템 확인

---

## 💡 팁 & 트릭

### 이미지 사용법

#### 방법 1: Notion에 직접 업로드 (추천 ⭐)
```
1. Notion 페이지에 이미지 드래그 앤 드롭
2. 자동으로 블로그에 표시됨
3. 별도 작업 필요 없음
```

#### 방법 2: 외부 URL 사용
```
- Unsplash: https://images.unsplash.com/...
- Imgur: https://i.imgur.com/...
- 기타 이미지 호스팅
```

**주의:** GitHub blob URL은 사용하지 마세요!
```
❌ https://github.com/user/repo/blob/main/image.png
✅ https://raw.githubusercontent.com/user/repo/main/image.png
```

#### 커버 이미지 권장 사양
```
권장 크기: 1200x630px (Open Graph 최적)
최소 크기: 800x400px
형식: JPG, PNG (WebP 피하기)
용량: 1MB 이하 권장
```

---

### URL 커스터마이징

#### Slug 속성 사용

**비워두면 (기본):**
```
Title: "Next.js로 블로그 만들기"
→ URL: /posts/next-js
```

**직접 입력:**
```
Slug: "my-awesome-nextjs-tutorial"
→ URL: /posts/my-awesome-nextjs-tutorial
```

**규칙:**
- 영문 소문자 추천
- 띄어쓰기는 하이픈(-)으로
- 특수문자 자동 제거
- SEO 친화적으로!

---

### 카테고리 활용

#### 현재 사용 가능한 카테고리

```
📁 Technology  - 기술, 개발 관련
📁 Business    - 비즈니스, 스타트업
📁 Travel      - 여행, 경험
📁 Story       - 일상, 이야기
```

**새 카테고리 추가:**
1. Notion 데이터베이스에서 Category 속성 클릭
2. "Create new option" 클릭
3. 이름 입력 후 색상 선택

---

### 태그 전략

#### 좋은 태그 예시
```
✅ Technology, Frontend, React
✅ Business, Startup, Marketing
✅ Travel, Japan, Photography
```

#### 나쁜 태그 예시
```
❌ tech, TECHNOLOGY, 기술 (일관성 없음)
❌ a, test, 123 (의미 없음)
❌ very-long-tag-name-that-is-too-specific
```

**팁:**
- 3-5개 정도가 적당
- 영문 추천 (검색 최적화)
- 일관성 유지
- 재사용 가능하게

---

## 🔄 빠른 참조

### 글 작성 체크리스트

```
Notion:
□ Title 입력
□ 본문 작성
□ Status → Published
□ Published Date 설정
□ Featured Image (선택)
□ Category 선택 (선택)
□ Tags 추가 (선택)

배포:
□ blog.bugi.co.kr/admin 접속
□ 비밀번호 입력
□ "지금 재배포" 클릭
□ 1-2분 대기

확인:
□ 홈페이지에 글 표시
□ 이미지 정상 로딩
□ 링크 작동
□ 댓글 시스템 작동
```

---

## ❓ 문제 해결 (FAQ)

### Q1: 글이 안 보여요!

**체크리스트:**
1. Status가 "Published"인가? ← 가장 흔한 원인!
2. 재배포를 했나?
3. 1-2분 기다렸나?
4. 캐시 때문일 수 있음 → `Ctrl+Shift+R` (강력 새로고침)

---

### Q2: 이미지가 안 보여요!

**확인 사항:**
1. 이미지 URL이 HTTPS인가?
2. GitHub blob URL 사용? → raw URL로 변경
3. Notion 업로드 이미지? → 정상 작동해야 함
4. 외부 이미지 CORS 에러? → Notion 직접 업로드 권장

**해결 방법:**
```bash
# GitHub 이미지 URL 변경
❌ https://github.com/user/repo/blob/main/bg.png
✅ https://raw.githubusercontent.com/user/repo/main/bg.png
```

---

### Q3: 글 수정은 어떻게 하나요?

**방법:**
1. Notion에서 해당 글 찾기
2. 내용 수정
3. Status가 "Published"인지 확인
4. 관리자 페이지에서 재배포
5. 완료!

**참고:** Title을 변경하면 URL도 변경될 수 있습니다. Slug를 미리 설정하면 URL 고정 가능.

---

### Q4: 글을 삭제하고 싶어요!

**방법 1: Draft로 변경** (임시 숨김)
```
Status: Published → Draft
재배포 → 블로그에서 안 보임
```

**방법 2: 완전 삭제**
```
Notion에서 페이지 삭제
재배포 → 블로그에서 제거됨
```

---

### Q5: 재배포가 실패해요!

**확인 사항:**
1. Vercel 대시보드에서 에러 로그 확인
2. 환경 변수 확인 (`NOTION_TOKEN`, `NOTION_DATABASE_ID`)
3. Notion Integration 연결 확인

**일반적인 해결:**
- 1-2분 후 다시 시도
- Vercel에서 수동 재배포

---

### Q6: 댓글이 안 보여요!

**Giscus 설정 필요:**
1. GitHub Discussions 활성화
2. Giscus App 설치
3. `categoryId` 환경 변수 설정

**참고:** 댓글 시스템은 배포 후 설정이 필요합니다.

---

## 🎯 완벽한 글 예시

### 예시 1: 기술 블로그

```
Title: Next.js 15로 풀스택 앱 만들기
Status: Published
Published Date: 2026-01-20
Category: Technology
Tags: Frontend, Next.js, React, TypeScript
Author: 최호
Slug: nextjs-15-fullstack-app
Featured Image: https://images.unsplash.com/photo-xxx

[본문]
# Next.js 15의 새로운 기능

Next.js 15가 출시되면서...

## 1. Server Actions
...

## 2. Turbopack
...
```

### 예시 2: 여행 블로그

```
Title: 제주도 3박 4일 여행 코스 추천
Status: Published
Published Date: 2026-01-19
Category: Travel
Tags: Travel, Jeju, Korea
Author: 최호
Slug: jeju-travel-guide
Featured Image: https://images.unsplash.com/photo-yyy

[본문]
지난 주말 제주도에 다녀왔습니다...
```

---

## 📱 모바일에서 글쓰기

### Notion 모바일 앱 사용

**장점:**
- ✅ 언제 어디서나 글 작성
- ✅ 이미지 첨부 편리
- ✅ 음성 입력 가능

**방법:**
1. Notion 앱 열기
2. 데이터베이스 찾기
3. 새 페이지 생성
4. 작성 후 Status → Published
5. 데스크톱에서 재배포 (또는 모바일 브라우저로 관리자 페이지 접속)

---

## 🚀 프로 팁

### 1. 초안 관리
```
Status: Draft     - 작성 중
Status: Review    - 검토 중 (새 옵션 추가)
Status: Published - 발행됨
```

### 2. 예약 발행
```
Published Date를 미래 날짜로 설정
→ 현재는 표시 안 됨
→ 날짜 지나면 자동 표시
```

### 3. 시리즈 글
```
태그를 시리즈명으로 활용:
- React Series
- Travel Diary
- Weekly Recap
```

### 4. SEO 최적화
```
- Title: 50자 이내 권장
- Description: 첫 단락이 자동 추출
- Tags: 3-5개 (검색 키워드)
- Slug: 의미있는 영문 URL
```

### 5. 이미지 최적화
```
- 커버 이미지: 1200x630
- 본문 이미지: 800px 이하
- 용량: 각 1MB 이하
- 형식: JPG (사진), PNG (그래픽)
```

---

## 📊 분석 & 개선

### 글 성과 확인

**Google Search Console:**
- 검색 노출 횟수
- 클릭 수
- 평균 순위

**Google Analytics:** (설정 시)
- 페이지뷰
- 체류 시간
- 이탈률

### 개선 포인트

**제목:**
- 클릭을 유도하는 제목
- 키워드 포함
- 50자 이내

**본문:**
- 최소 1,000자 권장
- 소제목으로 구조화
- 이미지/표/코드블록 활용

**SEO:**
- 관련 키워드 자연스럽게 포함
- 내부 링크 활용
- 외부 링크 신뢰도 높은 곳

---

## 🎓 학습 자료

### Notion 마스터하기
- [Notion 가이드](https://www.notion.so/help/guides)
- [마크다운 문법](https://www.markdownguide.org/)

### 블로그 운영
- [Google SEO 가이드](https://developers.google.com/search/docs)
- [효과적인 글쓰기](https://www.grammarly.com/blog/)

---

## 📞 도움이 필요하면?

**에러 발생 시:**
1. Vercel 대시보드에서 빌드 로그 확인
2. Notion Integration 연결 확인
3. 환경 변수 확인

**문의:**
- GitHub Issues
- 이메일
- 댓글

---

## ✅ 요약

```bash
# 가장 중요한 3가지
1. Notion에서 작성 → Status: Published
2. blog.bugi.co.kr/admin → 재배포
3. 1-2분 대기 → 완료!
```

**Happy Blogging! 🎉**
