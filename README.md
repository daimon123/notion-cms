# Notion CMS 블로그 + 포트폴리오

Notion을 CMS로 활용한 개인 블로그 및 포트폴리오 사이트입니다.
Notion API를 통해 별도 관리자 UI 없이 Notion에서 직접 글을 작성하고 관리할 수 있습니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **CMS**: Notion API (`@notionhq/client`)
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **배포**: Vercel

## 주요 기능

- Notion 데이터베이스에서 블로그 글 목록 조회
- 개별 글 상세 페이지 렌더링 (Notion 블록 지원)
- 카테고리 및 태그 필터링
- 검색 기능
- 반응형 디자인
- 내 소개 및 이력 타임라인 페이지

## 시작하기

### 요구사항

- Node.js 18+
- Notion 계정 및 Integration API 키

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```bash
NOTION_API_KEY=secret_xxxx
NOTION_DATABASE_ID=xxxx
```

**Notion API 키 발급 방법:**
1. [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) 접속
2. "새 통합" 생성 후 Internal Integration Token 복사
3. 연결할 Notion 데이터베이스 페이지에서 통합 연결 (공유 → 연결 추가)

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버: [http://localhost:3000](http://localhost:3000)

### 빌드

```bash
npm run build
npm start
```

## Notion 데이터베이스 구조

블로그 포스트 데이터베이스에 아래 필드를 생성해야 합니다.

| 필드명 | 타입 | 설명 |
|--------|------|------|
| Title | title | 글 제목 |
| Category | select | 카테고리 (예: 개발, 일상) |
| Tags | multi_select | 태그 목록 |
| Published | date | 발행일 |
| Status | select | `발행됨` / `초안` |

> `Status`가 `발행됨`인 글만 사이트에 노출됩니다.

## 페이지 구조

```
/                       홈 - 최근 글 목록
/blog                   전체 글 목록
/blog/[slug]            글 상세 페이지
/blog/category/[name]   카테고리별 글 목록
/about                  내 소개 + 이력 타임라인
```

## 프로젝트 구조

```
notion-cms-project/
├── docs/
│   └── PRD.md              # 제품 요구사항 문서
├── frontend/               # Next.js 앱
│   ├── app/                # App Router 페이지
│   ├── components/         # UI 컴포넌트
│   └── lib/                # Notion API 유틸리티
├── .env.local              # 환경 변수 (git 제외)
└── package.json
```

## 라이선스

MIT
