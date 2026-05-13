const projectData = {
    project4: {
        title: "시장 품질 데이터 처리 플랫폼",
        date: "2026.02.19 - 2026.04.03 (7주)",
        institution: "삼성전자 네트워크 사업부",
        confidential: true,
        overview: "시장품질그룹의 엑셀 기반 반복 업무를 자동화하고, 수리·불량 데이터를 DBMS로 통합 관리하는 마이크로서비스 AX 플랫폼. Chatbot(자연어 DB 조회), Report(AI 자동 보고서), Reclassify(RAG 기반 증상 재분류), Repairguide(벡터 검색 기반 수리 가이드) 4개의 AI 서비스로 구성",
        tech: ["Python", "FastAPI", "React", "LangGraph", "LangChain", "MariaDB", "Milvus", "SQLAlchemy", "Docker"],
        schedule: "2026.02 - 2026.04 (7주)",
        member: "PM 1명, Backend 3명, Frontend 1명, Infra 1명",
        role: "인프라 구축, Schema 설계, DB 적재 서비스 개발",
        features: [
            "고객사별 컬럼 매핑 기반 Excel/CSV 자동 파싱 및 DB 적재",
            "자연어 Q&A Chatbot (Orchestrator-Subagent 멀티에이전트, SSE 스트리밍)",
            "AI 기반 품질 보고서 자동 생성 및 이메일 발송 (LangGraph 파이프라인)",
            "RAG 기반 '기타' 증상 자동 재분류 (Milvus + BM25 하이브리드 검색)",
            "벡터 검색 기반 수리 가이드 생성 및 수리 문서 제공"
        ],
        hasDetailedTabs: true,
        background: {
            paragraphs: [
                "삼성전자 네트워크 사업부 시장품질그룹은 고객사로부터 수집한 장비 수리·불량 데이터를 분석해 품질 개선 방향을 도출하는 업무를 수행합니다. 그러나 모든 데이터가 엑셀 파일과 파일 시스템 기반으로 분산 관리되어, 4명 이상의 직원이 매주 3~4일을 단순 문서 작업에만 투입하는 상황이었습니다.",
                "데이터가 통합된 저장소 없이 파일 단위로 흩어져 있다 보니, 부서 전체 데이터를 아우르는 통합 분석이나 깊이 있는 인사이트 도출이 사실상 불가능했습니다. 각 담당자가 엑셀에서 수동으로 데이터를 취합하고 정리하는 과정에서 오류 가능성도 높았습니다.",
                "반복 업무를 자동화하고 데이터를 DBMS로 통합 관리함으로써 직원들이 분석과 의사결정에 집중할 수 있도록, <strong>LLM Agent 기반 AX(AI Transformation) 플랫폼</strong> 구축이 기획되었습니다."
            ],
            painPoints: [
                "4명 이상이 주 3~4일간 단순 문서 작업에 투입",
                "파일 시스템 기반 데이터 관리로 통합 분석 불가",
                "수동 취합 과정에서의 오류 가능성",
                "부서 간 데이터 공유 및 협업 어려움"
            ]
        },
        detailedFeatures: [
            {
                title: "DB 적재 서비스 (Backend)",
                description: "고객사마다 컬럼명이 다른 Excel·CSV 파일을 DB의 InventoryMapping 테이블 기반으로 자동 변환하여 적재합니다. 새 고객사 추가 시 코드 수정 없이 매핑 테이블 등록만으로 처리되며, 매핑이 없으면 Default 매핑으로 자동 폴백합니다. LOAD DATA LOCAL INFILE과 배치 INSERT 폴백을 조합해 대용량 데이터도 안정적으로 처리합니다."
            },
            {
                title: "자연어 Q&A Chatbot",
                description: "Orchestrator → SQL Expert / Visualizer 구조의 멀티에이전트로 구현했습니다. SQL Expert는 list_tables → get_schema → sql_db_query 순서로 스키마를 확인한 뒤 think_tool로 쿼리 로직을 자기 검증하고 실행합니다. SSE 스트리밍으로 AI 사고 과정을 단계별로 렌더링하며, LangGraph의 AsyncSqliteSaver를 체크포인터로 사용해 thread_id 기반 멀티턴 대화를 유지합니다."
            },
            {
                title: "AI 자동 보고서 생성 (Report)",
                description: "LangGraph 파이프라인(Intent Analysis → Query Planning → Data Retrieval → Analysis → Deep Dive Loop → Report Assembly)으로 구현됩니다. 이상치 탐지(MoM, YoY, 선형 회귀 기울기 등)는 pandas/numpy가 전담하고 LLM은 문장 생성만 맡아 환각을 방지합니다. 비동기 백그라운드 태스크로 실행되며 완료 시 DOCX 보고서를 이메일로 자동 발송합니다."
            },
            {
                title: "RAG 기반 증상 재분류 (Reclassify)",
                description: "'기타'/'기타 불량'으로 등록된 RMA 증상을 AI가 자동으로 적절한 카테고리로 재분류합니다. Milvus 벡터 검색과 BM25 키워드 검색을 RRF(Reciprocal Rank Fusion)로 융합하고 CrossEncoder로 재채점합니다. 도메인 특화 기술 용어 매칭을 위해 BM25(0.7) : 벡터(0.3) 가중치를 적용했으며, GaussLLM이 후보 5개 중 최적 카테고리를 선택합니다."
            },
            {
                title: "수리 가이드 생성 (Repairguide)",
                description: "장비 시리얼과 불량 증상을 입력하면 Milvus에서 4채널 하이브리드 검색(증상 Dense 0.50 / BM25 Sparse 0.25 / 전체 문맥 Dense 0.20 / 수리 결과 Dense 0.05)으로 유사 수리 사례 5건을 검색합니다. LangGraph 파이프라인이 사례와 제품 정보를 컨텍스트로 조합해 LLM 수리 가이드를 생성하고, 관련 수리 문서(DOCX) 다운로드 링크를 함께 제공합니다."
            }
        ],
        troubleshooting: [
            {
                title: "대용량 데이터 적재 성능 문제",
                tags: ["MariaDB", "LOAD DATA LOCAL INFILE", "Bulk Insert", "성능 최적화"],
                problem: "수십만 건의 Inventory 데이터를 배치 INSERT로 처리하면 SQL 파싱과 트랜잭션 오버헤드가 누적됩니다. 50만 건 기준 배치 INSERT 처리 시 20분 이상이 소요되어 실사용이 어려운 수준이었습니다.",
                solution: "pandas DataFrame을 임시 CSV 파일로 변환한 뒤 MariaDB의 LOAD DATA LOCAL INFILE 명령으로 서버 측에서 직접 파일을 읽어 적재하는 방식으로 전환했습니다. SQLAlchemy 엔진 URL에 local_infile=1 옵션을 추가하고 raw cursor로 실행했으며, LOAD DATA INFILE이 실패하는 환경을 대비해 10,000건 단위 배치 INSERT 폴백 로직도 함께 구현했습니다.",
                result: "50만 건 기준 적재 시간이 20분 이상에서 5분 내외로 단축되어 약 4배의 성능 개선을 달성했습니다."
            },
            {
                title: "불량률 집계 조회 68초 → 0.1초",
                tags: ["MariaDB", "Materialized Table", "Stored Procedure", "쿼리 최적화"],
                problem: "불량률 조회 View(v_monthly_defect_rate)는 내부에서 Inventory와 RMA 전체를 집계하는 두 뷰를 JOIN하는 구조였습니다. 뷰는 매 조회마다 서브쿼리를 실행하기 때문에, 데이터가 누적될수록 응답 시간이 68초까지 늘어나 실사용이 불가능한 수준이었습니다.",
                solution: "Materialized Table 패턴을 적용했습니다. monthly_defect_rate_aggregated 집계 전용 테이블을 두고, 데이터 업로드 후 CALL refresh_monthly_defect_rate_aggregated() Stored Procedure를 호출하여 수동 갱신하는 방식으로 전환했습니다. 조회 시에는 이 테이블을 단순 SELECT하도록 래핑 뷰를 구성했습니다. 실시간 갱신이 불필요하고 업로드 후 별도 refresh 호출이 필요하다는 트레이드오프를 팀과 합의했습니다.",
                result: "조회 응답 시간이 68초에서 0.1초로 단축되어 <strong>665배 성능 개선</strong>을 달성했습니다."
            },
            {
                title: "Chatbot 단일 에이전트 도구 혼용 문제 → Orchestrator-Subagent 전환",
                tags: ["LangGraph", "Multi-Agent", "Orchestrator", "LLM 설계"],
                problem: "초기에는 단일 에이전트에 SQL 도구와 시각화 도구를 모두 제공했습니다. 컨텍스트가 길어질수록 LLM이 도구를 혼동하거나 불필요한 도구를 연달아 호출하는 문제가 발생했고, 에이전트가 SQL을 직접 작성하다가 잘못된 쿼리를 실행하는 사고도 반복되었습니다.",
                solution: "Orchestrator → SQL Expert / Visualizer 구조의 멀티에이전트로 재설계했습니다. 오케스트레이터는 의도 파악과 서브에이전트 위임만 담당하고, SQL Expert는 스키마 탐색 후 think_tool로 쿼리 로직을 자기 검증한 뒤 실행하도록 역할을 분리했습니다. SQL Expert에게는 SELECT 전용 읽기 제약도 적용하여 의도치 않은 데이터 변경을 방지했습니다.",
                result: "각 에이전트의 시스템 프롬프트가 짧고 명확해져 도구 혼용 오류가 해소되었습니다. think_tool을 통한 자기 검증으로 잘못된 쿼리 실행 빈도도 크게 줄었습니다."
            }
        ]
    },
    project3: {
        title: "웹 IDE 기반 모의 코테 사이트",
        date: "2025.12 (4주)",
        institution: "SSAFY",
        overview: "웹 브라우저에서 백준 문제를 직접 풀고, Markdown 메모 및 AI 챗봇 힌트까지 제공하는 통합 코딩 테스트 학습 플랫폼",
        tech: ["Java", "Spring Boot", "Vue.js", "MySQL", "Docker", "WebSocket"],
        image: "assets/img/cote_architecture.png",
        schedule: "2025.12 (4주)",
        member: "FullStack 2명",
        role: "FullStack 개발",
        features: [
            "백준 문제 크롤링 및 웹 렌더링",
            "자동완성 없는 모의 코테 환경에서 코드 작성 및 컴파일",
            "Markdown 기반 문제 풀이 메모 작성 및 조회",
            "AI 챗봇 기반 힌트 보기 및 코드 분석"
        ],
        hasDetailedTabs: true,
        background: {
            paragraphs: [
                "IT 직군 취업을 준비할 때 코딩 테스트는 빼놓을 수 없는 관문입니다. 그런데 실제 코딩 테스트 환경은 평소 개발 환경과 사뭇 다릅니다. IDE 사용이 제한되고, 자동 완성·문법 강조 등의 보조 기능이 없는 단순 텍스트 에디터 환경에서 문제를 풀어야 하는 경우가 많습니다. 평소에 이런 환경을 접해보지 않으면 실전에서 적잖은 당혹감을 느끼게 됩니다.",
                "또한 문제를 풀고 나서 풀이 과정, 배운 점, 다음에 써먹을 아이디어 등을 정리하려면 Notion, GitHub, Velog 등 별도 도구를 열어야 합니다. 풀이 환경과 기록 환경이 분리되어 있다 보니 번거롭고, 정리를 미루다 아예 안 하게 되는 경우도 많습니다.",
                "<strong>\"문제 풀이와 학습 정리가 한 화면에서 가능하다면?\"</strong> 이라는 물음에서 이 프로젝트가 시작되었습니다. 모의 코테에 가까운 제약된 환경에서 풀이·컴파일·메모까지 한 곳에서 처리하고, AI 챗봇으로 막히는 부분에 힌트를 받을 수 있는 통합 학습 플랫폼을 목표로 했습니다."
            ],
            painPoints: [
                "실제 코테 환경(자동완성 없음)에 적응 어려움",
                "IDE 없이 풀이하는 연습 환경 부재",
                "풀이 후 기록을 위해 별도 도구로 전환 필요",
                "막힐 때 도움받을 수 있는 수단 부족"
            ]
        },
        detailedFeatures: [
            {
                title: "백준 문제 크롤링 및 렌더링",
                description: "백준 문제 번호를 입력하거나 난이도를 선택하면, 해당 문제를 크롤링하여 웹 화면에 바로 표시합니다. 외부 사이트로 이동할 필요 없이 문제와 풀이 환경을 한 화면에서 확인할 수 있습니다."
            },
            {
                title: "모의 코테 환경 에디터",
                description: "자동 완성, 문법 강조 등의 보조 기능 없이 코드를 작성하는 모의 코딩 테스트 환경을 제공합니다. 실제 시험과 유사한 조건에서 반복 연습할 수 있습니다."
            },
            {
                title: "코드 컴파일 및 실행",
                description: "Docker 기반 격리된 실행 환경에서 작성한 코드를 직접 컴파일하고 실행 결과를 확인할 수 있습니다."
            },
            {
                title: "Markdown 메모",
                description: "문제별로 Markdown 형식의 메모를 작성하고 저장할 수 있습니다. 풀이 과정, 배운 점, 다음에 참고할 내용 등을 정리하여 언제든 다시 확인할 수 있습니다."
            },
            {
                title: "AI 챗봇 연동",
                description: "프롬프트를 미리 설계하여 힌트 보기, 내 코드 분석 등 학습에 유용한 질의를 AI 챗봇에 바로 요청할 수 있습니다."
            }
        ]
    },
    project1: {
        title: "AI 기반 온라인 스터디 관리 자동화 플랫폼",
        date: "2026.01 - 2026.02 (6주)",
        institution: "SSAFY",
        overview: "스터디 그룹의 출결, 학습 시간, 벌금 정산 등 운영 업무를 자동화하고, LiveKit SFU 기반 화상 스터디와 AI 비속어 필터링·챗봇을 통해 방장과 구성원 모두가 학습에 집중할 수 있는 환경을 제공하는 플랫폼",
        tech: ["Java", "Spring Boot", "Vue.js", "MySQL", "Redis", "MongoDB", "WebRTC (LiveKit)", "WebSocket", "RabbitMQ", "Docker", "Jenkins"],
        image: "assets/img/study_architecture.png",
        schedule: "2026.01 - 2026.02 (6주)",
        member: "PM 1명, Backend 2명, Frontend 2명, Infra 1명",
        role: "WebRTC(LiveKit) 기반 화상 스터디 기능 구현, DB 스키마 설계",
        features: [
            "스터디 생성/탐색 및 라이프사이클 자동 전이 (PENDING → IN_PROGRESS → ENDED)",
            "보증금/벌금 자동 정산 및 정상 출석자 리워드 균등 분배",
            "출결 및 공부 시간 자동 집계",
            "LiveKit SFU 기반 스터디윗미 (라이브 화상 스터디)",
            "실시간 채팅 (Redis 버퍼링 → MongoDB 이관) + AI 비속어 필터링",
            "AI 챗봇 (4가지 페르소나, LLM 기반 응원/꾸중 봇)"
        ],
        hasDetailedTabs: true,
        background: {
            paragraphs: [
                "코로나19 팬데믹을 계기로 비대면 서비스 수요가 폭발적으로 증가했고, 온라인 스터디 문화 역시 빠르게 확산되었습니다. 엔데믹 전환 이후에도 시간·장소에 구애받지 않는 온라인 스터디에 대한 수요는 여전히 높은 수준을 유지하고 있습니다.",
                "그런데 온라인 스터디를 이끄는 방장의 역할을 들여다보면, 생각보다 많은 수작업이 필요합니다. 매 세션마다 출결을 직접 확인·기록하고, 누적 학습 시간을 수동으로 집계하며, 지각·결석 기준에 따른 벌금을 정산하고, 참여자 간 학습 분위기까지 조율해야 합니다. 스터디 규모가 커질수록 이러한 운영 부담은 가중되며, 정작 방장 본인의 학습 집중도에도 영향을 미칩니다.",
                "<strong>\"방장도 편하게 공부할 수 없을까?\"</strong> 라는 단순한 물음에서 이 프로젝트는 시작되었습니다. 출결부터 벌금 정산까지, 반복적이고 번거로운 스터디 운영 업무를 서비스가 자동으로 처리해 줌으로써 방장과 구성원 모두가 학습에만 집중할 수 있는 환경을 만드는 것이 목표입니다."
            ],
            painPoints: [
                "매 세션 수동 출결 확인 및 기록",
                "누적 학습 시간 수동 집계",
                "지각·결석 기준 벌금 정산",
                "참여자 간 학습 분위기 관리"
            ]
        },
        detailedFeatures: [
            {
                title: "스터디 관리 및 라이프사이클 자동화",
                description: "스터디 요일을 비트마스크로 저장하고, 스케줄러가 1분마다 PENDING → IN_PROGRESS → ENDED 상태를 자동 전이합니다. 제목·카테고리·시작 시간·목표 시간·보증금·인원 수 복합 필터와 페이지네이션으로 스터디를 탐색할 수 있습니다."
            },
            {
                title: "보증금 & 벌금 자동 정산",
                description: "퇴실 시간 +1분 후 스케줄러가 자동 실행됩니다. 결석은 minDeposit 전액, 지각은 latePenalty 고정 벌금, 목표 시간 미충족은 ceil(부족시간/단위시간) × 단위금액으로 계산합니다. 걷힌 벌금은 정상 출석자에게 균등 분배(나머지 1원은 랜덤 배분)하며, 보증금이 부족한 멤버는 자동 강퇴 처리됩니다. 당일 정산 이력 조회로 스케줄러의 멱등성을 보장합니다."
            },
            {
                title: "출결 & 공부 시간 자동 집계",
                description: "체크인 시간 기준으로 지각 여부를 판단하고, 공부 시간은 클라이언트가 주기적으로 서버에 저장합니다. 정산 후 당일 출석 이력은 히스토리 테이블로 이관되어 누적 관리됩니다."
            },
            {
                title: "실시간 알림 (STOMP + RabbitMQ)",
                description: "스케줄러가 입실 10분 전 대상자에게 STOMP 푸시 알림을 전송하고, 정산 완료 직후 멤버별 결과(보상/벌금/강퇴)를 실시간으로 전송합니다. 외부 브로커인 RabbitMQ를 사용하여 서버 수평 확장 시에도 메시지 수신이 가능하도록 설계했습니다. 알림은 DB에도 영구 저장되어 미접속 사용자도 나중에 조회할 수 있습니다."
            },
            {
                title: "스터디윗미 (LiveKit SFU 화상 스터디)",
                description: "Spring이 LiveKit에 Room을 생성하고 JWT 토큰을 발급하면, 클라이언트가 토큰으로 LiveKit SFU에 직접 WebRTC 연결하는 구조입니다. 시청자 수는 Redis로 집계하고 STOMP로 전체 구독자에게 브로드캐스트합니다. LiveKit은 SFU + TURN 서버를 단일 Docker 이미지에 내장하여 EC2 방화벽 환경에서도 WebRTC 연결이 가능합니다."
            },
            {
                title: "실시간 채팅 & AI 비속어 필터링",
                description: "방송 중 채팅 메시지는 Redis에 임시 저장하고, 방송 종료 시 MongoDB로 벌크 이관합니다. 채팅은 JOIN이 없는 시간순 조회만 필요하므로 MongoDB 도큐먼트 모델이 적합합니다. KcELECTRA 한국어 모델 + ONNX Runtime으로 비속어를 감지하며, 독성 점수 0.7 이상 시 메시지를 자동으로 숨깁니다."
            },
            {
                title: "AI 스터디 챗봇",
                description: "방송 중 결석·타이머 이벤트를 트리거로 SEED LLM이 응원/꾸중 메시지를 자동 생성합니다. 엄마(MOM) / 선생님(TEACHER) / 친구(FRIEND) / 잼민이(KID) 4가지 페르소나 중 선택 가능하며, 칭찬 봇/꾸중 봇을 각각 ON/OFF로 설정할 수 있습니다. LLM 서버는 Spring API 서버와 분리(FastAPI)하여 추론 부하가 핵심 API에 영향을 주지 않도록 설계했습니다."
            }
        ],
        troubleshooting: [
            {
                title: "WebRTC 성능 저하 — Mesh 구조에서 SFU로 전환",
                tags: ["WebRTC", "LiveKit", "SFU", "성능 최적화"],
                problem: "서버 비용을 최소화하기 위해 초기에는 별도의 미디어 서버 없이 참여자들이 직접 P2P 연결하는 Mesh 구조로 WebRTC 환경을 구축했습니다. Mesh 구조는 참여자 수(N)가 늘어날수록 연결 수가 N(N-1)/2으로 급격히 증가하며, 각 클라이언트가 모든 참여자에게 별도의 스트림을 업로드해야 합니다. 실제 테스트에서 참여자 5명 이상부터 클라이언트 CPU 사용률이 65% 이상으로 치솟고 영상이 끊기는 문제가 발생했습니다.",
                solution: "오픈소스 WebRTC SFU 서버인 LiveKit을 도입했습니다. SFU 구조에서는 각 클라이언트가 서버에만 스트림을 전송하고 서버가 이를 다른 참여자에게 선택적으로 포워딩합니다. 클라이언트당 업스트림 연결이 단 1개로 고정되어, 참여자 수가 늘어도 클라이언트 부하가 선형으로만 증가합니다. LiveKit은 SFU + TURN 서버를 단일 Docker 이미지에 내장하고 있어 EC2 방화벽 환경에서의 WebRTC 연결 실패도 함께 해결했습니다.",
                result: "5인 기준 클라이언트 평균 CPU 사용률이 약 65%에서 22% 수준으로 감소했습니다. 영상 프레임 드롭률도 35% 이상에서 5% 미만으로 개선되어, 10인 이상 스터디에서도 안정적인 화상 통화가 가능해졌습니다."
            },
            {
                title: "백그라운드 탭 전환 시 AI 감지 및 타이머 중단 문제",
                tags: ["MediaPipe", "Browser API", "WebRTC", "AI 감지"],
                problem: "브라우저에서 탭을 백그라운드로 전환하면 자바스크립트 실행 속도를 크게 제한하는 정책이 적용됩니다. AI 공석 감지는 매 프레임마다 화면을 분석해야 하는데, 이 정책으로 인해 감지 로직이 제대로 실행되지 않았습니다. 공부 중 다른 탭으로 전환하는 상황은 실사용에서 충분히 발생할 수 있어 문제가 됐습니다.",
                solution: "감지 로직을 시간 기반 인터벌 방식에서 비디오 프레임 도착 이벤트 기반으로 전환했습니다. 비디오 스트림 자체는 백그라운드에서도 WebRTC를 통해 계속 수신되기 때문에, 프레임이 도착할 때마다 감지 로직이 실행되도록 수정하여 브라우저의 실행 속도 제한을 우회했습니다.",
                result: "백그라운드 탭 상태에서도 AI 공석 감지와 타이머가 정상적으로 동작하게 되었습니다."
            },
            {
                title: "실시간 채팅 DB 부하 문제 → Redis 버퍼링 + MongoDB 이관",
                tags: ["Redis", "MongoDB", "채팅", "성능 최적화"],
                problem: "방송 중 채팅 메시지를 MySQL에 직접 INSERT하면, 활성 방송이 여러 개일 때 초당 수십 건의 쓰기가 메인 DB에 집중됩니다. 스터디 정산, 출결 처리 등 핵심 트랜잭션이 실행되는 메인 DB에 부하가 집중되는 구조적 문제였습니다.",
                solution: "방송 중에는 Redis 인메모리에만 메시지를 저장하고(지연 없음), 방송 종료 이벤트 시점에 Redis 전체 메시지를 MongoDB로 벌크 이관한 뒤 Redis 키를 삭제하는 방식으로 전환했습니다. 채팅 데이터는 JOIN이 없는 시간순 조회만 필요하므로 RDB보다 MongoDB 도큐먼트 모델이 적합합니다. 단, 서버가 방송 종료 전에 다운되면 Redis 데이터가 유실될 수 있는 트레이드오프가 있습니다.",
                result: "메인 DB 부하가 해소되었고, 채팅 쓰기 지연이 사실상 사라졌습니다."
            }
        ]
    }
};

function renderOverviewTab(data) {
    const featuresHtml = data.features ? data.features.map(f => `<li>${f}</li>`).join('') : '';
    let architectureSection = '';
    if (data.image) {
        architectureSection = `
            <div class="project-detail-section">
                <h4>아키텍처</h4>
                <img src="${data.image}" alt="${data.title} Architecture" class="architecture-image">
            </div>
        `;
    }
    return `
        <div class="project-detail-section">
            <h4>프로젝트 개요</h4>
            <p>${data.overview}</p>
        </div>
        <div class="project-meta-grid">
            <div class="meta-item">
                <h4>일정</h4>
                <p>${data.schedule}</p>
            </div>
            <div class="meta-item">
                <h4>인원</h4>
                <p>${data.member}</p>
            </div>
        </div>
        <div class="project-detail-section">
            <h4>역할</h4>
            <p>${data.role}</p>
        </div>
        <div class="project-detail-section">
            <h4>주요 기능</h4>
            <ul class="feature-list" style="padding-left: 20px; line-height: 1.6;">
                ${featuresHtml}
            </ul>
        </div>
        <div class="project-detail-section">
            <h4>사용 기술</h4>
            <div class="skill-chips">
                ${data.tech.map(t => `<span class="skill-chip">${t}</span>`).join('')}
            </div>
        </div>
        ${architectureSection}
    `;
}

function renderBackgroundTab(background) {
    const paragraphs = background.paragraphs.map(p => `<p class="bg-paragraph">${p}</p>`).join('');
    const painPoints = background.painPoints.map(pt => `<li>${pt}</li>`).join('');
    return `
        <div class="tab-content-section">
            ${paragraphs}
        </div>
        <div class="tab-content-section">
            <h4>해결해야 할 문제</h4>
            <ul class="pain-point-list">
                ${painPoints}
            </ul>
        </div>
    `;
}

function renderFeaturesTab(features) {
    const featureCards = features.map((f, i) => `
        <div class="feature-card">
            <div class="feature-number">${String(i + 1).padStart(2, '0')}</div>
            <div class="feature-info">
                <h5>${f.title}</h5>
                <p>${f.description}</p>
            </div>
        </div>
    `).join('');
    return `<div class="feature-cards-grid">${featureCards}</div>`;
}

function renderTroubleshootingTab(troubleshooting) {
    const items = troubleshooting.map((ts, i) => {
        if (ts.placeholder) {
            return `
                <div class="ts-item ts-placeholder">
                    <div class="ts-header">
                        <span class="ts-number">#${i + 1}</span>
                        <h5>${ts.title}</h5>
                    </div>
                    <div class="ts-placeholder-body">
                        <p>추후 업데이트 예정입니다.</p>
                    </div>
                </div>
            `;
        }
        const tagsHtml = ts.tags ? ts.tags.map(tag => `<span class="ts-tag">${tag}</span>`).join('') : '';
        return `
            <div class="ts-item">
                <div class="ts-header">
                    <span class="ts-number">#${i + 1}</span>
                    <h5>${ts.title}</h5>
                </div>
                <div class="ts-tags">${tagsHtml}</div>
                <div class="ts-body">
                    <div class="ts-section">
                        <span class="ts-label problem">문제 상황</span>
                        <p>${ts.problem}</p>
                    </div>
                    <div class="ts-section">
                        <span class="ts-label solution">해결 방법</span>
                        <p>${ts.solution}</p>
                    </div>
                    <div class="ts-section">
                        <span class="ts-label result">결과</span>
                        <p>${ts.result}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    return `<div class="ts-list">${items}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-button');
    const projectCards = document.querySelectorAll('.project-card');

    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalBody = document.getElementById('modal-body');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            const data = projectData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalDate.textContent = `${data.institution} | ${data.date}`;

                const confidentialHtml = data.confidential ? `
                    <div class="confidential-notice">
                        <strong>[대외비]</strong> 본 프로젝트는 삼성전자 네트워크 사업부와의 실무 연계 프로젝트로, 내부 보안 규정에 따라 일부 세부 내용 및 실제 데이터는 공개하지 않습니다.
                    </div>
                ` : '';

                let contentHtml;
                if (data.hasDetailedTabs) {
                    contentHtml = `
                        ${confidentialHtml}
                        <div class="modal-tabs">
                            <button class="tab-btn active" data-tab="overview">개요</button>
                            <button class="tab-btn" data-tab="background">배경</button>
                            <button class="tab-btn" data-tab="features">기능 소개</button>
                            ${data.troubleshooting && data.troubleshooting.length > 0 ? '<button class="tab-btn" data-tab="troubleshooting">트러블슈팅</button>' : ''}
                        </div>
                        <div class="tab-panel active" id="tab-overview">
                            ${renderOverviewTab(data)}
                        </div>
                        <div class="tab-panel" id="tab-background">
                            ${renderBackgroundTab(data.background)}
                        </div>
                        <div class="tab-panel" id="tab-features">
                            ${renderFeaturesTab(data.detailedFeatures)}
                        </div>
                        ${data.troubleshooting && data.troubleshooting.length > 0 ? `
                        <div class="tab-panel" id="tab-troubleshooting">
                            ${renderTroubleshootingTab(data.troubleshooting)}
                        </div>
                        ` : ''}
                    `;
                } else {
                    let architectureSection = '';
                    if (data.image) {
                        architectureSection = `
                            <div class="project-detail-section">
                                <h4>아키텍처</h4>
                                <img src="${data.image}" alt="${data.title} Architecture" class="architecture-image">
                            </div>
                        `;
                    }
                    const featuresHtml = data.features ? data.features.map(f => `<li>${f}</li>`).join('') : '';
                    contentHtml = `
                        ${confidentialHtml}
                        <div class="project-detail-section">
                            <h4>프로젝트 개요</h4>
                            <p>${data.overview}</p>
                        </div>
                        <div class="project-meta-grid">
                            <div class="meta-item">
                                <h4>일정</h4>
                                <p>${data.schedule}</p>
                            </div>
                            <div class="meta-item">
                                <h4>인원</h4>
                                <p>${data.member}</p>
                            </div>
                        </div>
                        <div class="project-detail-section">
                            <h4>역할</h4>
                            <p>${data.role}</p>
                        </div>
                        <div class="project-detail-section">
                            <h4>주요 기능</h4>
                            <ul class="feature-list" style="padding-left: 20px; line-height: 1.6;">
                                ${featuresHtml}
                            </ul>
                        </div>
                        <div class="project-detail-section">
                            <h4>사용 기술</h4>
                            <div class="skills-container">
                                ${data.tech.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                        ${architectureSection}
                    `;
                }

                modalBody.innerHTML = contentHtml;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';

                if (data.hasDetailedTabs) {
                    const tabBtns = modalBody.querySelectorAll('.tab-btn');
                    tabBtns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            tabBtns.forEach(b => b.classList.remove('active'));
                            modalBody.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                            btn.classList.add('active');
                            modalBody.querySelector(`#tab-${btn.dataset.tab}`).classList.add('active');
                        });
                    });
                }

                const archImg = modalBody.querySelector('.architecture-image');
                if (archImg) {
                    archImg.addEventListener('click', () => {
                        const zoomModal = document.getElementById('image-zoom-modal');
                        const zoomImg = document.getElementById('zoomed-image');
                        zoomImg.src = archImg.src;
                        zoomModal.style.display = 'flex';
                    });
                }
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const zoomModal = document.getElementById('image-zoom-modal');
    if (zoomModal) {
        const closeZoomBtn = document.querySelector('.close-zoom-button');
        closeZoomBtn.addEventListener('click', () => {
            zoomModal.style.display = 'none';
        });
        zoomModal.addEventListener('click', (event) => {
            if (event.target === zoomModal) {
                zoomModal.style.display = 'none';
            }
        });
    }
});
