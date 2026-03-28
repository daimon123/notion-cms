# ROADMAP: 블로그 + 포트폴리오 통합 사이트

> Notion을 CMS로 활용한 개인 포트폴리오 및 블로그 웹 서비스 개발 로드맵

---

## 전체 일정 개요

| Phase | 내용 | 예상 기간 | 시작일 (기준) |
|-------|------|-----------|---------------|
| Phase 1 | 프로젝트 초기 설정 | 1~2일 | Day 1 |
| Phase 2 | 공통 모듈 개발 | 2~3일 | Day 3 |
| Phase 3 | 핵심 기능 개발 | 3~4일 | Day 6 |
| Phase 4 | 추가 기능 개발 | 2~3일 | Day 10 |
| Phase 5 | 최적화 및 배포 | 1~2일 | Day 13 |
| **합계** | | **9~14일** | |

---

## Phase 1: 프로젝트 초기 설정

> **예상 소요 시간:** 1~2일

### 목표

견고한 개발 기반을 구축한다. 기반 없이는 이후 기능 개발이 어렵고, 환경 설정 오류가 후반부에 큰 비용을 초래한다.

### 작업 목록

#### 1-1. Next.js 프로젝트 구조 설정
- [ ] Next.js 15 (App Router) 프로젝트 생성
- [ ] TypeScript 설정 (`tsconfig.json` 확인)
- [ ] Tailwind CSS 설정
- [ ] shadcn/ui 초기화 및 기본 컴포넌트 설치
- [ ] Lucide React 설치
- [ ] 디렉토리 구조 정의 (`app/`, `components/`, `lib/`, `types/`)

#### 1-2. Notion API 연동 환경 구축
- [ ] `@notionhq/client` 패키지 설치
- [ ] Notion Integration 생성 및 API 키 발급
- [ ] Notion 블로그 포스트 데이터베이스 생성
  - 필드: Title, Category, Tags, Published, Status, Content
- [ ] Notion 데이터베이스에 Integration 연결
- [ ] `.env.local` 환경 변수 설정
  ```env
  NOTION_API_KEY=secret_xxxx
  NOTION_DATABASE_ID=xxxx
  ```
- [ ] `.env.example` 파일 생성 (API 키 제외)

#### 1-3. 기본 레이아웃 구조 생성
- [ ] `app/layout.tsx` — 루트 레이아웃 (HTML, Body 구조)
- [ ] 라우트 구조 초기 생성
  ```
  app/
  ├── page.tsx              (홈 /)
  ├── blog/
  │   ├── page.tsx          (/blog)
  │   ├── [slug]/
  │   │   └── page.tsx      (/blog/[slug])
  │   └── category/
  │       └── [name]/
  │           └── page.tsx  (/blog/category/[name])
  └── about/
      └── page.tsx          (/about)
  ```

### 완료 기준

- `npm run dev` 실행 시 에러 없이 개발 서버가 정상 구동됨
- 각 라우트(`/`, `/blog`, `/blog/test`, `/about`)에 접근 시 빈 페이지라도 200 응답 반환
- Notion API 연결 테스트 스크립트 실행 시 데이터베이스 응답 수신 확인
- `.env.local`이 `.gitignore`에 포함되어 있음

---

## Phase 2: 공통 모듈 개발

> **예상 소요 시간:** 2~3일

### 목표

모든 기능에서 재사용되는 코드를 먼저 완성한다. 공통 모듈 없이 개별 기능을 개발하면 중복 코드가 누적되고 나중에 리팩토링 비용이 크게 증가한다.

### 작업 목록

#### 2-1. 공통 타입 정의
- [ ] `types/notion.ts` — Notion API 응답 원시 타입
- [ ] `types/blog.ts` — 애플리케이션 레벨 타입
  ```typescript
  // 주요 타입
  Post, PostMeta, Category, Tag, NotionBlock
  ```

#### 2-2. Notion API 공통 함수
- [ ] `lib/notion/client.ts` — Notion 클라이언트 싱글턴 초기화
- [ ] `lib/notion/posts.ts`
  - `fetchPosts()` — 발행된 글 목록 조회 (Status: 발행됨)
  - `fetchPostBySlug(slug)` — slug 기반 단일 글 조회
  - `fetchPostContent(pageId)` — 페이지 블록 콘텐츠 조회
  - `fetchCategories()` — 카테고리 목록 조회
- [ ] 캐싱 전략 적용 (Notion API 제한: 3 req/s 고려)
  - Next.js `cache()` 또는 `revalidate` 옵션 활용

#### 2-3. 공통 컴포넌트
- [ ] `components/layout/Header.tsx` — 네비게이션 (홈, 블로그, 소개)
- [ ] `components/layout/Footer.tsx` — 푸터 (저작권, 링크)
- [ ] `components/blog/PostCard.tsx` — 글 목록 카드 (제목, 날짜, 카테고리, 태그)
- [ ] `components/ui/` — shadcn/ui 기반 공통 UI 컴포넌트

### 완료 기준

- `fetchPosts()` 호출 시 Notion 데이터베이스의 발행된 글 목록이 정상 반환됨
- `fetchPostContent(pageId)` 호출 시 블록 배열 반환 확인
- Header, Footer 컴포넌트가 모든 페이지에서 렌더링됨
- PostCard 컴포넌트가 mock 데이터로 정상 렌더링됨
- TypeScript 타입 오류 없음 (`npm run build` 타입 체크 통과)

---

## Phase 3: 핵심 기능 개발

> **예상 소요 시간:** 3~4일

### 목표

블로그의 가장 기본이 되는 기능을 완성한다. PRD의 P0 우선순위 기능이 모두 이 단계에서 구현된다.

### 작업 목록

#### 3-1. 블로그 글 목록 페이지 (`/blog`)
- [ ] `fetchPosts()`로 발행된 글 목록 조회
- [ ] PostCard 컴포넌트로 글 목록 그리드 렌더링
- [ ] 로딩 상태 처리 (`loading.tsx`)
- [ ] 빈 목록 상태 처리 (글이 없을 때 안내 메시지)

#### 3-2. 블로그 글 상세 페이지 (`/blog/[slug]`)
- [ ] `fetchPostBySlug(slug)`로 글 메타 정보 조회
- [ ] `fetchPostContent(pageId)`로 블록 콘텐츠 조회
- [ ] 제목, 발행일, 카테고리, 태그 헤더 렌더링
- [ ] 이전/다음 글 네비게이션
- [ ] 존재하지 않는 slug 접근 시 404 처리 (`notFound()`)

#### 3-3. Notion 콘텐츠 블록 렌더링
- [ ] `components/notion/NotionRenderer.tsx` — 블록 배열 렌더링 진입점
- [ ] 블록 타입별 컴포넌트 구현
  - [ ] `paragraph` — 일반 텍스트
  - [ ] `heading_1`, `heading_2`, `heading_3` — 제목
  - [ ] `bulleted_list_item`, `numbered_list_item` — 목록
  - [ ] `code` — 코드 블록 (언어 하이라이팅 포함)
  - [ ] `image` — 이미지 (Next.js `<Image>` 사용, S3 URL 만료 주의)
  - [ ] `divider` — 구분선
  - [ ] `quote` — 인용구
  - [ ] `callout` — 콜아웃 박스

#### 3-4. 홈 페이지 (`/`)
- [ ] 최근 발행된 글 목록 (최대 6~9개) 카드 형태 표시
- [ ] 간단한 자기소개 섹션
- [ ] 카테고리 빠른 이동 링크

### 완료 기준

- `/blog` 접근 시 Notion에서 발행된 글 목록이 카드 형태로 표시됨
- `/blog/[slug]` 접근 시 해당 글의 전체 내용이 렌더링됨
- 코드 블록, 이미지, 제목 등 주요 Notion 블록이 올바르게 표시됨
- 존재하지 않는 slug 접근 시 404 페이지로 이동
- 모바일(375px), 태블릿(768px), 데스크톱(1280px)에서 레이아웃 정상 동작

---

## Phase 4: 추가 기능 개발

> **예상 소요 시간:** 2~3일

### 목표

핵심 기능이 안정적으로 동작한 이후 PRD의 P1 우선순위 기능을 추가한다.

### 작업 목록

#### 4-1. 카테고리 필터링
- [ ] `/blog` 페이지 상단에 카테고리 필터 탭 추가
- [ ] 카테고리별 글 목록 페이지 (`/blog/category/[name]`) 구현
  - `fetchPostsByCategory(category)` 함수 추가
  - 카테고리명 헤더 표시
- [ ] 선택된 카테고리 탭 활성화 상태 표시

#### 4-2. 검색 기능
- [ ] `/blog` 페이지에 검색 입력창 추가
- [ ] 클라이언트 사이드 제목 기반 필터링 구현
  - (참고: Notion API는 전문 검색을 지원하지 않으므로 클라이언트 필터링 방식 채택)
- [ ] 검색 결과 없을 때 안내 메시지 표시

#### 4-3. SEO 최적화
- [ ] `generateMetadata()` — 각 글 페이지에 동적 메타태그 생성
  - `title`, `description`, `openGraph`, `twitter` 태그
- [ ] `sitemap.ts` — 사이트맵 자동 생성
- [ ] `robots.ts` — robots.txt 생성
- [ ] 기본 OG 이미지 설정

#### 4-4. 소개 페이지 (`/about`)
- [ ] 프로필 이미지 및 자기소개 텍스트
- [ ] 기술 스택 배지 목록
- [ ] 이력 타임라인 (학력, 경력, 프로젝트)
- [ ] 연락처 링크 (GitHub, 이메일)

### 완료 기준

- 카테고리 탭 클릭 시 해당 카테고리 글만 필터링되어 표시됨
- `/blog/category/[name]` URL 직접 접근 시 정상 동작
- 검색창에 키워드 입력 시 실시간으로 글 목록이 필터링됨
- 각 글 상세 페이지의 `<title>`, OG 태그가 해당 글 정보로 채워짐
- `/about` 페이지에 소개, 기술 스택, 타임라인이 정상 표시됨

---

## Phase 5: 최적화 및 배포

> **예상 소요 시간:** 1~2일

### 목표

기능 구현이 완료된 후 서비스 품질을 높이고 실제 운영 환경에 배포한다.

### 작업 목록

#### 5-1. 성능 최적화
- [ ] ISR(Incremental Static Regeneration) 설정
  - `revalidate` 값 설정 (예: 60초) — Notion API 요청 최소화
- [ ] Next.js `<Image>` 컴포넌트로 이미지 최적화
  - Notion S3 URL 만료 이슈 대응 방안 확인
- [ ] `generateStaticParams()` 적용 — 글 상세 페이지 빌드 타임 사전 생성
- [ ] LCP 측정 및 2.5초 이하 달성 확인 (비기능 요구사항)

#### 5-2. 반응형 디자인 개선
- [ ] 모바일(375px) / 태블릿(768px) / 데스크톱(1280px) 전 구간 점검
- [ ] 터치 인터랙션 및 가독성 최종 확인
- [ ] 접근성 점검 (WCAG 2.1 AA — 키보드 내비게이션, 색상 대비)

#### 5-3. Vercel 배포
- [ ] GitHub 리포지토리 연결 및 Vercel 프로젝트 생성
- [ ] Vercel 환경 변수 설정 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
- [ ] 프로덕션 빌드 오류 없음 확인 (`npm run build`)
- [ ] 배포 후 주요 페이지 동작 검증
  - `/`, `/blog`, `/blog/[slug]`, `/about`

### 완료 기준

- Vercel 프로덕션 URL로 전체 기능 정상 동작
- Lighthouse 성능 점수 80점 이상
- LCP 2.5초 이하 달성
- 모바일 환경에서 레이아웃 깨짐 없음
- Notion API 키가 클라이언트에 노출되지 않음 (보안 요구사항)
- `npm run build` 타입 오류 및 빌드 오류 없음

---

## 향후 계획 (Phase 5 이후)

PRD 10절 확장 계획에 따른 후속 작업 목록:

| 기능 | 설명 |
|------|------|
| 다크 모드 | Tailwind `dark:` 클래스 및 시스템 설정 연동 |
| 글 조회수 트래킹 | Vercel Analytics 또는 별도 DB 연동 |
| 뉴스레터 구독 | 이메일 수집 폼 및 발송 서비스 연동 |
| 프로젝트 포트폴리오 | 별도 Notion DB 연결 및 프로젝트 섹션 추가 |
| 다국어 지원 | `next-intl` 또는 Next.js i18n 라우팅 적용 |
| RSS 피드 | `/feed.xml` 자동 생성 |
| 댓글 기능 | Giscus(GitHub Discussions 기반) 등 연동 |

---

## 참고 문서

- [PRD.md](./PRD.md) — 제품 요구사항 정의서
- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [Vercel 배포 가이드](https://vercel.com/docs)
