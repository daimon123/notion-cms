# CLAUDE.md — Notion CMS 블로그 + 포트폴리오 프로젝트

> Claude가 이 프로젝트에서 작업할 때 참고해야 할 컨텍스트, 규칙, 제약사항을 정의한다.

---

## 프로젝트 개요

Notion을 CMS로 활용한 개인 블로그 + 포트폴리오 통합 웹 서비스.
별도의 관리자 UI나 데이터베이스 서버 없이 Notion에서 직접 글을 작성하면 사이트에 반영된다.

- **PRD**: `docs/PRD.md`
- **개발 로드맵**: `docs/ROADMAP.md`

---

## 기술 스택

```
Frontend
├── Next.js 15 (App Router)
├── TypeScript
├── Tailwind CSS
├── shadcn/ui
└── Lucide React

CMS
└── Notion API (@notionhq/client)

배포
└── Vercel
```

---

## 프로젝트 디렉토리 구조

```
notion-cms-project/
├── app/                        # Next.js App Router 페이지
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 홈 (/)
│   ├── blog/
│   │   ├── page.tsx            # 전체 글 목록 (/blog)
│   │   ├── [slug]/
│   │   │   └── page.tsx        # 글 상세 (/blog/[slug])
│   │   └── category/
│   │       └── [name]/
│   │           └── page.tsx    # 카테고리별 목록 (/blog/category/[name])
│   └── about/
│       └── page.tsx            # 소개 페이지 (/about)
├── components/
│   ├── layout/                 # Header, Footer
│   ├── blog/                   # PostCard 등 블로그 전용 컴포넌트
│   ├── notion/                 # Notion 블록 렌더링 컴포넌트
│   └── ui/                     # shadcn/ui 기반 공통 UI
├── lib/
│   └── notion/
│       ├── client.ts           # Notion 클라이언트 싱글턴
│       └── posts.ts            # fetchPosts, fetchPostBySlug, fetchPostContent 등
├── types/
│   ├── notion.ts               # Notion API 응답 원시 타입
│   └── blog.ts                 # Post, PostMeta, Category, Tag 등 앱 레벨 타입
├── docs/
│   ├── PRD.md
│   └── ROADMAP.md
└── .env.local                  # 환경 변수 (git 제외)
```

> **참고**: 루트의 `frontend/`, `backend/` 디렉토리는 이전 스타터킷 코드로, 이 프로젝트와 무관하다. Next.js 앱은 루트 또는 별도 디렉토리에 구성한다.

---

## 환경 변수

```env
NOTION_API_KEY=secret_xxxx        # Notion Integration 시크릿 키
NOTION_DATABASE_ID=xxxx           # 블로그 포스트 Notion 데이터베이스 ID
```

- **보안 필수**: 두 값 모두 서버 사이드에서만 사용. `NEXT_PUBLIC_` 접두사 절대 사용 금지.
- `.env.local`은 `.gitignore`에 포함되어 있어야 한다.

---

## Notion 데이터베이스 스키마

### 블로그 포스트 데이터베이스

| 필드명    | 타입         | 설명                         |
| --------- | ------------ | ---------------------------- |
| Title     | title        | 글 제목                      |
| Category  | select       | 카테고리 ("개발", "일상" 등) |
| Tags      | multi_select | 태그 목록                    |
| Published | date         | 발행일                       |
| Status    | select       | `발행됨` / `초안`            |
| Content   | page content | Notion 페이지 블록 본문      |

- **발행 조건**: `Status === "발행됨"` 인 글만 사이트에 노출한다.

---

## 코딩 컨벤션

### 언어

- 모든 코드 주석: **한국어**
- 변수명 / 함수명: **영어** (camelCase)
- 컴포넌트명: **PascalCase**

### TypeScript

- `any` 사용 금지. 타입 추론이 어려우면 `unknown` 후 타입 가드 사용.
- Notion API 응답 타입과 앱 레벨 타입을 분리한다 (`types/notion.ts` vs `types/blog.ts`).

### 컴포넌트

- 서버 컴포넌트 우선. 클라이언트 상태가 필요한 경우에만 `"use client"` 추가.
- shadcn/ui 컴포넌트를 먼저 활용하고, 부족할 때만 커스텀 컴포넌트 작성.

### 들여쓰기

- **2칸** (스페이스)

---

## 핵심 제약사항

### Notion API 제한

- 요청 속도: 평균 **3 req/s**
- 대응: Next.js `cache()` 또는 `revalidate` 옵션으로 ISR 적용. 페이지당 API 호출 최소화.
- 글 상세 페이지는 `generateStaticParams()`로 빌드 타임에 사전 생성한다.

### Notion 이미지 URL 만료

- Notion의 이미지는 AWS S3 URL로 제공되며 **1시간 후 만료**된다.
- `<Image>` 컴포넌트 사용 시 `unoptimized` 또는 별도 프록시 전략을 고려한다.

### 검색 기능

- Notion API는 전문 검색(full-text search)을 지원하지 않는다.
- 검색은 클라이언트 사이드에서 제목 기반 필터링으로 구현한다.

---

## 비기능 요구사항 (목표 수치)

| 항목   | 목표                                   |
| ------ | -------------------------------------- |
| LCP    | 2.5초 이하                             |
| 접근성 | WCAG 2.1 AA 준수                       |
| SEO    | 각 글 페이지에 동적 메타태그 + OG 태그 |
| 보안   | Notion API 키 서버 사이드 전용         |

---

## 현재 개발 단계

ROADMAP.md 기준으로 현재 진행 중인 Phase를 확인 후 작업한다.
각 Phase의 **완료 기준**을 충족해야 다음 Phase로 넘어간다.

| Phase   | 내용               | 상태      |
| ------- | ------------------ | --------- |
| Phase 1 | 프로젝트 초기 설정 | 진행 예정 |
| Phase 2 | 공통 모듈 개발     | 대기      |
| Phase 3 | 핵심 기능 개발     | 대기      |
| Phase 4 | 추가 기능 개발     | 대기      |
| Phase 5 | 최적화 및 배포     | 대기      |

---

## 자주 사용하는 명령어

```bash
# 개발 서버 실행
npm run dev

# 타입 체크 + 빌드
npm run build

# 린트
npm run lint
```

---

## MVP 범위 (우선 집중)

MVP에 포함된 기능만 먼저 완성한다. MVP 외 기능은 Phase 4 이후에 구현한다.

**MVP 포함 (P0)**

- Notion API 연동
- 글 목록 페이지 (`/blog`)
- 글 상세 페이지 (`/blog/[slug]`)
- 기본 Notion 블록 렌더링 (텍스트, 이미지, 코드)
- 반응형 디자인

**MVP 제외 (Phase 4+)**

- 검색 기능
- 카테고리 필터 페이지
- 소개/타임라인 페이지
- SEO 최적화 (동적 메타태그)
