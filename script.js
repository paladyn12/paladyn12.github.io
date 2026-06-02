const projectData = {
    project4: {
        title: "시장 품질 데이터 처리 플랫폼",
        date: "2026.02 - 2026.04 (6주)",
        institution: "삼성전자 네트워크 사업부",
        confidential: true,
        overview: "삼성전자 네트워크사업부의 글로벌 통신사 기지국 장비 운용(Inventory) 및 불량(RMA) 데이터를 수집·처리·분석하는 마이크로서비스 AX 플랫폼. Chatbot(자연어 DB 조회), Report(AI 자동 보고서), Reclassify(RAG 기반 증상 재분류), Repairguide(벡터 검색 기반 수리 가이드) 4개의 AI 서비스로 구성",
        tech: ["Python", "FastAPI", "React", "LangGraph", "LangChain", "MariaDB", "Milvus", "SQLAlchemy", "Docker"],
        schedule: "2026.02 - 2026.04 (6주)",
        member: "Backend 1명, Frontend 1명, AI 4명",
        role: "DB 스키마 설계, 개발 환경 구축 및 인프라 세팅, 데이터 적재 파이프라인 구축, Deep Agent 기반 AI 챗봇 구조 설계",
        features: [
            "대용량 데이터 업로드: 고객사별 Excel/CSV 컬럼 자동 매핑 후 Inventory·RMA 데이터 MariaDB 적재",
            "불량률 대시보드: 월별 제품군 불량률 집계 조회",
            "AI 챗봇 (Chatbot): 자연어로 데이터 조회, 시각화 차트 렌더링, 멀티턴 대화 지원",
            "AI 증상 재분류 (Reclassify): '기타' 증상 RMA를 AI가 자동으로 적절한 카테고리로 재분류",
            "자동 품질 보고서 (Report): LangGraph 파이프라인으로 보고서 자동 생성 후 이메일 발송",
            "수리 가이드 (Repairguide): 불량 증상 입력 시 유사 수리 사례 검색 및 LLM 가이드 생성"
        ],
        troubleshooting: [
            {
                title: "불량률 조회 응답 68.4s → 0.1s",
                tags: ["MariaDB", "Materialized Table", "Stored Procedure", "커버링 인덱스", "RANGE 파티셔닝"],
                problem: "대용량 Inventory 및 RMA 데이터를 매번 실시간으로 집계하는 구조 — 데이터가 누적될수록 응답 속도가 기하급수적으로 저하, 최대 응답 시간 68.4초",
                solution: "Materialized Table 패턴을 도입하여 집계 테이블을 미리 생성 — Stored Procedure를 통해 비동기적으로 갱신하도록 개선. 조회 패턴에 최적화된 커버링 인덱스 및 월 단위 RANGE 파티셔닝을 적용",
                metric: { before: "68.4s", after: "0.1s", improvement: "약 680배 향상" },
                beforeFlow: ["조회 요청", "전체 집계 실시간 수행", "68.4s 응답"],
                afterFlow: ["조회 요청", "집계 테이블 SELECT", "0.1s 응답"]
            },
            {
                title: "대용량 데이터 적재 시간 85% 단축 (20분 → 3분)",
                tags: ["MariaDB", "LOAD DATA LOCAL INFILE", "Bulk Insert", "Batch Fallback"],
                problem: "Inventory 데이터를 행 단위 INSERT로 처리 시 SQL 파싱 및 트랜잭션 오버헤드가 누적되어 50만 줄 기준 20분 이상 소요",
                solution: "LOAD DATA LOCAL INFILE 도입 — pandas DataFrame을 임시 CSV로 변환 후 MariaDB 엔진 레벨에서 직접 Bulk 적재 (3분 이내). 환경 제약으로 Bulk Load 실패 시 10,000건 단위 Batch INSERT로 자동 전환하는 Fallback 로직 구현",
                metric: { before: "20분 이상", after: "3분 이내", improvement: "적재 시간 85% 절감" },
                beforeFlow: ["행 단위 INSERT × N", "SQL 파싱 × N", "트랜잭션 × N", "20분+"],
                afterFlow: ["DataFrame → CSV", "LOAD DATA LOCAL INFILE", "3분 이내"]
            },
            {
                title: "Deep Agent 기반 챗봇 설계로 환각 현상 극복",
                tags: ["LangGraph", "Deep Agent", "LLM", "환각 현상"],
                problem: "시장 품질 데이터에 전문 용어와 축약어가 혼재 — 챗봇 Agent가 데이터를 제대로 파악하지 못해 존재하지 않는 테이블 조회, 의도치 않은 데이터 반환 등 환각 현상 발생",
                solution: "Deep Agent 기반 LLM Agent 구조 도입 — Orchestrator가 CoT로 의도 분석 및 Todo 생성, SQL 실행·용어 파악 등 작업은 wiki_expert / sql_expert / Visualizer Sub Agent에게 할당",
                metric: { before: "환각 현상 빈번", after: "환각 발생 3% 내외", improvement: "안정적 자연어 쿼리" },
                beforeFlow: ["자연어 질의", "단일 Agent 처리", "환각 현상 발생"],
                afterFlow: ["자연어 질의", "Orchestrator (CoT / write_todos)", "Sub Agents 분담 처리", "정확한 결과 반환"]
            }
        ]
    },
    project2: {
        title: "바른발음 — AI 기반 한국어 발음 교정 서비스",
        date: "2026.04 - 2026.05 (7주)",
        institution: "SSAFY",
        overview: "외국인 화자의 한국어 발음을 녹음 및 음소 단위로 분석하여 모국어 패턴에 맞춘 정밀 피드백을 제공하는 음소 단위 발음 교정 플랫폼",
        tech: ["Kotlin", "Spring Boot", "FastAPI", "Spring Cloud Gateway", "PostgreSQL", "Redis", "Kafka", "Docker", "Jenkins"],
        schedule: "2026.04 - 2026.05 (7주)",
        member: "FE 2명, BE 2명, Infra 1명, AI 1명",
        role: "AI 서빙 파이프라인 설계, DB 스키마 설계, 실전 회화 기능 설계 및 API 구현",
        features: [
            "발음 분석: 음성 녹음 → wav2vec2 음소 ASR → GOP 스코어링 → L1 오류 진단 → Gemini API 피드백 생성",
            "AI 회화 연습: Whisper STT 변환 후 Gemma LLM 질문 생성, 발음 평가 병렬 수행",
            "배치 테스트: 단어 정답률 기준 BEGINNER / INTERMEDIATE / ADVANCED 레벨 산정 및 약점 음운 패턴 추출",
            "원어민 발음 듣기: Gemini Native TTS API",
            "오답노트: 음소 분석 결과 북마크, 이전·현재 발음 비교 뷰 제공",
            "학습 분석: 정확도 추이(7일/30일)·약점 음운 규칙 Top 5 종합 통계"
        ],
        troubleshooting: [
            {
                title: "분산 서비스 간 중복 인증 → API Gateway 집중 검증",
                tags: ["API Gateway", "JWT", "Spring Security", "MSA"],
                problem: "core-service·ai-service 각각이 JWT 직접 파싱 — Secret 관리 포인트 분산, 프레임워크(Spring/FastAPI) 차이로 인증 환경 통일 어려움",
                solution: "API Gateway에서 JWT 일괄 검증 후 X-User-Id, X-User-Role, X-User-NationalCode 헤더 주입 — 각 서비스는 헤더만 읽어 SecurityContext 설정, Secret 관리 단일화",
                beforeFlow: ["core-service: JWT 파싱", "ai-service: JWT 파싱", "Secret 분산 관리"],
                afterFlow: ["API Gateway: JWT 검증 + 헤더 주입", "각 서비스: 헤더 읽기만", "Secret 단일 관리"]
            },
            {
                title: "순차 처리 → Kafka 비동기 fan-in 구조로 응답 시간 50% 단축",
                tags: ["Kafka", "Redis", "비동기 처리", "fan-in"],
                problem: "발음 분석 → 맥락 분석의 순차 처리로 응답 지연 누적, 중간 단계 타임아웃 시 요청 유실",
                solution: "Kafka로 두 요청(발음·맥락)을 동시 발행 — 두 GPU 워커 병렬 처리 후 Redis에 결과 저장, 클라이언트가 jobId로 폴링해 취합하는 fan-in 구조",
                metric: { before: "순차 처리", after: "병렬 처리", improvement: "응답 시간 50% 단축 · 오류율 1% 미만" },
                beforeFlow: ["요청", "발음 분석", "맥락 분석", "결과 취합 (순차)"],
                afterFlow: ["요청", "Kafka 동시 발행 (fan-out)", "병렬 GPU 처리 → Redis", "jobId 폴링 취합"]
            },
            {
                title: "RunPod Pod 재시작마다 IP 변경 → Kafka outbound 구조로 해결",
                tags: ["RunPod", "Kafka", "인프라", "운영 자동화"],
                problem: "Pod HTTP 엔드포인트 직접 노출 구조 — Pod 재시작마다 IP 변경, 환경변수 수동 갱신 필요",
                solution: "워커가 GCP 고정 주소 Kafka 브로커에 outbound 연결만 하도록 변경 — Pod IP 노출 불필요, 재시작 후 자동 재연결, Kafka 영속화로 요청 유실 없음",
                beforeFlow: ["Pod 재시작", "IP 변경", "환경변수 수동 갱신"],
                afterFlow: ["Pod 재시작", "Kafka outbound 자동 연결", "요청 유실 없음"]
            }
        ]
    },
    project1: {
        title: "EZtoStudy — AI 기반 온라인 스터디 자동화 플랫폼",
        date: "2026.01 - 2026.02 (6주)",
        institution: "SSAFY",
        overview: "출결·벌금 자동 정산으로 방장의 운영 부담을 없애고, LiveKit 기반 화상 스터디와 AI 챗봇으로 몰입을 높이는 스터디 플랫폼",
        tech: ["Java", "Spring Boot", "Vue.js", "MySQL", "Redis", "MongoDB", "WebRTC (LiveKit)", "WebSocket", "RabbitMQ", "Docker", "Jenkins"],
        image: "assets/img/study_architecture.png",
        schedule: "2026.01 - 2026.02 (6주)",
        member: "PM 1명, FE 1명, BE 2명, Infra 1명, AI 1명",
        role: "WebRTC 환경 구축, DB 스키마 설계, 회원 및 스터디 관련 API 개발",
        features: [
            "스터디 관리: 복합 필터 검색, 스케줄러 기반 PENDING → IN_PROGRESS → ENDED 상태 자동 전이",
            "보증금·벌금 자동 정산: 결석·지각·목표 시간 미달 패널티 자동 계산 및 정상 출석자 균등 분배",
            "화상 스터디 및 라이브 스트리밍: LiveKit WebRTC 기반, 실시간 시청자 수 브로드캐스트",
            "실시간 채팅 & AI 모더레이션: KcELECTRA 기반 욕설·혐오 표현 자동 필터링",
            "AI 스터디 챗봇: 결석·타이머 이벤트 기반 응원/꾸중 메시지, 4가지 페르소나 선택",
            "실시간 알림: 입실 10분 전·정산 완료 알림 STOMP 전송, DB 영구 저장"
        ],
        troubleshooting: [
            {
                title: "Mesh → SFU 전환으로 연결 과부하 해결 (N² → N)",
                tags: ["WebRTC", "LiveKit", "SFU", "성능 최적화"],
                problem: "Mesh(P2P) 구조에서 5인 접속 시 인당 업스트림 4개(N-1) — 총 20개 연결 발생, 참가자 수에 따라 대역폭이 N배로 증가해 통화 품질 저하",
                solution: "LiveKit SFU 도입 — 각 클라이언트가 미디어 서버에만 1개 업스트림 유지. 내장 TURN 서버로 EC2 방화벽 환경의 직접 연결 실패도 함께 해결",
                metric: { before: "20개 연결", after: "5개 연결", improvement: "연결 수 75% 절감" },
                beforeFlow: ["User × N", "서로 직접 연결 N×(N-1)개", "CPU·대역폭 과부하"],
                afterFlow: ["User × N", "LiveKit SFU 업스트림 N개", "안정적 스트리밍"]
            },
            {
                title: "실시간 채팅 MySQL 직접 쓰기 → Redis + MongoDB 전환",
                tags: ["Redis", "MongoDB", "채팅", "성능 최적화"],
                problem: "방송 중 채팅 메시지를 MySQL에 직접 INSERT — 활성 방송 5개 기준 초당 약 50~100건 쓰기가 메인 DB에 집중, 서비스 전체 응답 지연",
                solution: "방송 중 Redis 인메모리에만 저장(~1ms), 방송 종료 시점에 MongoDB 벌크 이관 후 Redis 키 삭제",
                metric: { before: "MySQL 100건/s", after: "MySQL 0건/s", improvement: "응답 지연 90% 단축" },
                beforeFlow: ["채팅 발송", "MySQL INSERT × 50~100건/s", "메인 DB 부하"],
                afterFlow: ["채팅 발송", "Redis 저장 (~1ms)", "방송 종료 → MongoDB 벌크 이관"]
            },
            {
                title: "다중 탭 접속 시 시청자 수 중복 집계 방지",
                tags: ["Redis", "Lua Script", "동시성"],
                problem: "한 사용자가 여러 브라우저 탭에서 동시 접속 시 탭 수만큼 시청자 수가 중복 집계",
                solution: "Redis SADD(사용자 ID 집합 관리) + INCR를 Lua 스크립트로 원자적 처리 — SADD 성공(신규 입장)일 때만 카운트 증가",
                beforeFlow: ["탭1 접속 → INCR +1", "탭2 접속 → INCR +1", "시청자 수 +2 (중복)"],
                afterFlow: ["탭1·탭2 접속", "Lua: SADD → 집합 변화 시만 INCR", "정확한 시청자 수"]
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
        ]
    }
};

function renderModalContent(data) {
    const confidentialHtml = data.confidential ? `
        <div class="confidential-notice">
            <strong>[대외비]</strong> 본 프로젝트는 삼성전자 네트워크 사업부와의 실무 연계 프로젝트로, 내부 보안 규정에 따라 일부 세부 내용 및 실제 데이터는 공개하지 않습니다.
        </div>
    ` : '';

    const featuresSection = data.features && data.features.length > 0 ? `
        <div class="project-detail-section">
            <h4>주요 기능</h4>
            <ul class="feature-list" style="padding-left: 20px; line-height: 1.6;">
                ${data.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    const architectureSection = data.image ? `
        <div class="project-detail-section">
            <h4>아키텍처</h4>
            <img src="${data.image}" alt="${data.title} Architecture" class="architecture-image">
        </div>
    ` : '';

    const tsSection = data.troubleshooting && data.troubleshooting.length > 0 ? `
        <div class="project-detail-section ts-section-wrapper">
            <h4>트러블슈팅</h4>
            <div class="ts-list">
                ${data.troubleshooting.map((ts, i) => renderTsVisual(ts, i)).join('')}
            </div>
        </div>
    ` : '';

    return `
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
        ${featuresSection}
        <div class="project-detail-section">
            <h4>사용 기술</h4>
            <div class="skill-chips">
                ${data.tech.map(t => `<span class="skill-chip">${t}</span>`).join('')}
            </div>
        </div>
        ${architectureSection}
        ${tsSection}
    `;
}

function formatTsText(text) {
    const parts = text.split(' — ');
    if (parts.length === 1) return `<p class="ts-row-text">${text}</p>`;
    return `<ul class="ts-text-list">${parts.map(p => `<li>${p}</li>`).join('')}</ul>`;
}

function renderTsVisual(ts, index) {
    const makeFlowChain = (steps) =>
        steps.map(s => `<span class="flow-box">${s}</span>`).join('<span class="flow-arrow">→</span>');

    const flowHtml = (ts.beforeFlow || ts.afterFlow) ? `
        <div class="ts-flow-compare">
            ${ts.beforeFlow ? `
            <div class="flow-row">
                <span class="flow-label flow-before">Before</span>
                <div class="flow-chain">${makeFlowChain(ts.beforeFlow)}</div>
            </div>` : ''}
            ${ts.afterFlow ? `
            <div class="flow-row">
                <span class="flow-label flow-after">After</span>
                <div class="flow-chain">${makeFlowChain(ts.afterFlow)}</div>
            </div>` : ''}
        </div>
    ` : '';

    const metricHtml = ts.metric ? `
        <div class="ts-metric-bar">
            <div class="metric-side metric-before-side">
                <span class="metric-val">${ts.metric.before}</span>
                <span class="metric-lbl">Before</span>
            </div>
            <span class="metric-arrow-icon">→</span>
            <div class="metric-side metric-after-side">
                <span class="metric-val">${ts.metric.after}</span>
                <span class="metric-lbl">After</span>
            </div>
            ${ts.metric.improvement ? `<div class="metric-badge">${ts.metric.improvement}</div>` : ''}
        </div>
    ` : '';

    return `
        <div class="ts-visual-item">
            <div class="ts-visual-header">
                <span class="ts-number">#${index + 1}</span>
                <h5>${ts.title}</h5>
            </div>
            <div class="ts-visual-body">
                <div class="ts-row">
                    <span class="ts-row-label problem-label">문제</span>
                    <div class="ts-row-content">${formatTsText(ts.problem)}</div>
                </div>
                ${flowHtml}
                <div class="ts-row">
                    <span class="ts-row-label solution-label">해결</span>
                    <div class="ts-row-content">${formatTsText(ts.solution)}</div>
                </div>
                ${metricHtml}
            </div>
        </div>
    `;
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
            if (!data) return;

            modalTitle.textContent = data.title;
            modalDate.textContent = `${data.institution} | ${data.date}`;
            modalBody.innerHTML = renderModalContent(data);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            const archImg = modalBody.querySelector('.architecture-image');
            if (archImg) {
                archImg.addEventListener('click', () => {
                    const zoomModal = document.getElementById('image-zoom-modal');
                    const zoomImg = document.getElementById('zoomed-image');
                    zoomImg.src = archImg.src;
                    zoomModal.style.display = 'flex';
                });
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
