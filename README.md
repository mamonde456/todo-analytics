# Todo analytics

## 목차

1. [실행](#실행)
2. [환경 설정](#환경-설정)
3. [설치](#설치)
4. [진행 기간](#진행-기간)
5. [요구사항](#요구사항)
6. [한계점](#한계점)

## 실행

### 환경 설정

node 버전: 17.5.0
npm 버전: 8.4.1

### 설치

```
// 아래의 커맨드 입력
git clone https://github.com/mamonde456/todo-analytics.git

cd todo-analytics

npm i & npm run dev

// http://localhost:5173

```

## 진행 기간

- 2023.11.6 ~ 2023.11.12 (일주일)

## 요구사항

- 목록, 통계로 이루어진 탭 구성

- 목록 탭

  - 검색 기능
    - 할일 목록 불러오기, 할일 추가, 할일 수정 기능
    - 할일은 `제목`, `설명`, `날짜`, `상태` (검색 카테고리)로 구성
      - 상태는 `진행전`, `진행중`, `완료`로 구성
    - 날짜는 date-picker 선택 (라이브러리 사용함)

- 통계 탭
  - 라인 차트 구현 `apexCharts 사용`
    - x축: 날짜(오늘 기준 최근 1주일)
    - y축: 할일 개수
  - 도넛 차트 구현 `d3 사용`
    - 전체 할일의 상태(진행도)를 나타냄.
    - 우측에 범례 표시

## 한계점

할일 삭제 기능과 검색한 뒤 메인홈으로 돌아가는 기능 구현을 하지 못한 게 아쉽다고 생각합니다.
