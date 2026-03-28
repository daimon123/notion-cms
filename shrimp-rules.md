# Development Guidelines — Notion CMS Blog

## 프로젝트 개요

Notion을 CMS로 활용한 개인 블로그 + 포트폴리오 통합 서비스.
- Next.js 15 App Router 기반 SSR/ISR 앱
- `@notionhq/client`로 Notion 데이터베이스 조회
- Vercel 배포 대상

---

## 프로젝트 아키텍처

### 유효한 작업 디렉토리

```
notion-cms-project/         ← Next.js 앱 루트 (모든 작업은 여기서)
├── app/                    # Next.js App Router 페이지
├── components/             # UI 컴포넌트
├── lib/                    # 비즈니스 로직, Notion API 함수
├── types/                  # TypeScript 타입 정의
└── docs/                   # PRD, ROADMAP (참고용)
```

> **[금지]** `frontend/`, `backend/` 디렉토리는 이전 스타터킷 코드다. 절대 수정하거나 참조하지 말 것.

### 라우트 구조

| 파일 경로 | URL |
|-----------|-----|
| `app/page.tsx` | `/` |
| `app/blog/page.tsx` | `/blog` |
| `app/blog/[slug]/page.tsx` | `/blog/[slug]` |
| `app/blog/category/[name]/page.tsx` | `/blog/category/[name]` |
| `app/about/page.tsx` | `/about` |

### 컴포넌트 분류

| 디렉토리 | 용도 |
|----------|------|
| `components/layout/` | Header, Footer |
| `components/blog/` | PostCard 등 블로그 전용 |
| `components/notion/` | Notion 블록 렌더링 |
| `components/ui/` | shadcn/ui 기반 공통 UI |

### Notion 모듈 구조

| 파일 | 역할 |
|------|------|
| `lib/notion/client.ts` | Notion 클라이언트 싱글턴 (한 번만 초기화) |
| `lib/notion/posts.ts` | `fetchPosts`, `fetchPostBySlug`, `fetchPostContent`, `fetchCategories` |

---

## 코딩 컨벤션

### 언어 및 명명

- 코드 주석: **한국어** 필수
- 변수명/함수명: **영어 camelCase**
- 컴포넌트명: **영어 PascalCase**
- 들여쓰기: **2칸 스페이스**

### TypeScript

- **`any` 사용 금지** — 타입 추론이 어려우면 `unknown` + 타입 가드 사용
- `tsconfig.json`의 `strict: true` 유지 필수
- Notion API 원시 응답 타입 → `types/notion.ts`
- 앱 레벨 타입 → `types/blog.ts` (분리 필수)
- `npm run build` 타입 오류 없음 상태 유지

### 컴포넌트

- **서버 컴포넌트 우선** — 클라이언트 상태가 꼭 필요한 경우에만 `"use client"` 추가
- shadcn/ui 컴포넌트를 먼저 활용하고, 부족할 때만 커스텀 컴포넌트 작성
- 새 shadcn/ui 컴포넌트 추가 시 `npx shadcn@latest add <component>` 명령어 사용

---

## Notion API 사용 규칙

### 필수 준수 사항

- `NOTION_API_KEY`, `NOTION_DATABASE_ID`는 **서버 사이드 전용** — `NEXT_PUBLIC_` 접두사 절대 금지
- 모든 Notion API 호출은 `lib/notion/` 내부에서만 수행
- **발행 조건**: `Status === "발행됨"` 인 글만 조회/노출

### 캐싱 및 성능

- Notion API 제한: 평균 **3 req/s** — 모든 호출에 캐싱 적용 필수
- `fetchPosts`, `fetchPostContent` 등에 `next: { revalidate: 60 }` 또는 `cache()` 적용
- 글 상세 페이지(`/blog/[slug]`)는 `generateStaticParams()`로 빌드 타임 사전 생성
- 페이지당 API 호출 최소화 — 불필요한 중복 호출 금지

### Notion 이미지 처리

- Notion 이미지 URL은 AWS S3 링크로 **1시간 후 만료됨**
- `<Image>` 컴포넌트 사용 시 `unoptimized` 속성 추가 또는 프록시 전략 적용
- `next.config.ts`의 `images.remotePatterns`에 Notion S3 도메인 등록 필요

### Notion 데이터베이스 스키마

| 필드명 | 타입 | 비고 |
|--------|------|------|
| Title | title | 글 제목 |
| Category | select | "개발", "일상" 등 |
| Tags | multi_select | 태그 목록 |
| Published | date | 발행일 |
| Status | select | `발행됨` / `초안` |
| Content | page content | 페이지 블록 본문 |

---

## 기능 구현 표준

### Notion 블록 렌더링 (`components/notion/`)

- `NotionRenderer.tsx`가 진입점 — 블록 배열을 받아 타입별 컴포넌트로 분기
- 지원해야 할 블록 타입: `paragraph`, `heading_1/2/3`, `bulleted_list_item`, `numbered_list_item`, `code`, `image`, `divider`, `quote`, `callout`
- 미지원 블록 타입은 콘솔 경고 후 null 반환 (런타임 오류 금지)

### 404 처리

- 존재하지 않는 slug 접근 시 반드시 `notFound()` 호출

### 검색 기능

- Notion API 전문 검색 미지원 → **클라이언트 사이드 제목 기반 필터링**만 사용
- 서버에서 Notion 검색 API 호출 금지

### 반응형 디자인

- 모바일(375px), 태블릿(768px), 데스크톱(1280px) 세 구간 모두 지원 필수
- Tailwind CSS 반응형 접두사 사용: `sm:`, `md:`, `lg:`

---

## 환경 변수

```env
NOTION_API_KEY=secret_xxxx        # 서버 사이드 전용
NOTION_DATABASE_ID=xxxx           # 서버 사이드 전용
```

- `.env.local` 파일은 `.gitignore`에 포함되어야 함 — 커밋 금지
- `.env.example`에는 키 값 없이 변수명만 기재

---

## 파일 동시 수정 규칙

| 수정 대상 | 함께 수정해야 할 파일 |
|-----------|----------------------|
| `types/notion.ts` 타입 추가/변경 | `types/blog.ts`의 관련 변환 타입도 반드시 업데이트 |
| `lib/notion/posts.ts` 함수 추가 | 해당 함수를 사용하는 페이지 컴포넌트도 업데이트 |
| 새 라우트 추가 | `components/layout/Header.tsx` 네비게이션 링크 추가 여부 확인 |
| shadcn/ui 컴포넌트 추가 | `components/ui/` 디렉토리에 자동 생성됨 — 별도 수동 파일 생성 금지 |
| 환경 변수 추가 | `.env.example`에 변수명(값 없이) 반드시 추가 |

---

## 현재 개발 단계

| Phase | 내용 | 상태 |
|-------|------|------|
| Phase 1 | 프로젝트 초기 설정 | **진행 예정** |
| Phase 2 | 공통 모듈 개발 | 대기 |
| Phase 3 | 핵심 기능 개발 | 대기 |
| Phase 4 | 추가 기능 개발 | 대기 |
| Phase 5 | 최적화 및 배포 | 대기 |

- 현재 Phase 1 작업 진행 중
- MVP 우선: `/blog`, `/blog/[slug]`, 기본 Notion 블록 렌더링, 반응형 디자인
- Phase 4 이전에 검색/카테고리 필터/소개 페이지 구현 금지

---

## AI 의사결정 기준

### 컴포넌트 선택 우선순위

1. shadcn/ui 기존 컴포넌트 재사용
2. shadcn/ui 새 컴포넌트 추가 (`npx shadcn@latest add`)
3. 커스텀 컴포넌트 작성 (위 두 가지로 불가능할 때만)

### 서버/클라이언트 컴포넌트 판단 기준

- 기본값: **서버 컴포넌트**
- `"use client"` 추가 조건: `useState`, `useEffect`, 이벤트 핸들러, 브라우저 API 사용 시에만

### 데이터 패칭 위치

- Notion API 호출: 항상 서버 컴포넌트 또는 `lib/notion/` 함수 내부
- 클라이언트에서 직접 Notion API 호출 절대 금지

---

## 금지 사항

- `any` 타입 사용
- `NEXT_PUBLIC_NOTION_API_KEY` 또는 `NEXT_PUBLIC_NOTION_DATABASE_ID` 환경 변수 사용
- `frontend/`, `backend/` 디렉토리 수정 또는 참조
- 클라이언트 컴포넌트에서 Notion API 직접 호출
- 캐싱 없이 Notion API 반복 호출
- MVP 범위 외 기능을 Phase 3 이전에 구현
- `.env.local` 파일 git 커밋
- `notFound()` 없이 존재하지 않는 slug 처리
- `npm run build` 타입 오류 상태로 PR 제출
