const projectData = {
    project4: {
        title: "시장 품질 데이터 처리 플랫폼",
        date: "2026.02.19 - 2026.04.03 (7주)",
        institution: "삼성전자 네트워크 사업부",
        confidential: true,
        overview: "시장품질그룹의 엑셀 기반 반복 업무를 자동화하고, 수리·불량 데이터를 DBMS로 통합 관리하여 LLM Agent 기반의 깊이 있는 인사이트 도출과 보고서 자동화를 제공하는 AX 플랫폼",
        tech: ["Python", "FastAPI", "Streamlit", "LangChain", "LangGraph", "MariaDB"],
        schedule: "2026.02 - 2026.04 (7주)",
        member: "PM 1명, Backend 3명, Frontend 1명, Infra 1명",
        role: "인프라 구축, Schema 설계, DB 적재 Agent 개발",
        features: [
            "DB 적재 Agent 개발",
            "Q&A Agent 개발",
            "Report Agent 개발"
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
                title: "DB 적재 Agent",
                description: "시장품질그룹에서 사용하는 엑셀·CSV 파일을 자동으로 파싱·변환하여 DB에 적재합니다. 기존의 수작업 문서 처리를 자동화하여 반복 업무 부담을 대폭 줄입니다."
            },
            {
                title: "Q&A Agent",
                description: "DBMS에 저장된 수리·불량 데이터를 기반으로 자연어 질의응답을 제공합니다. 비개발 직군도 SQL 없이 데이터에서 인사이트를 얻을 수 있습니다."
            },
            {
                title: "Report Agent",
                description: "집계 데이터를 바탕으로 정형화된 품질 보고서를 자동 생성합니다. 기존에 직원이 수작업으로 작성하던 보고서를 자동화합니다."
            },
            {
                title: "수리·불량 처리 지원",
                description: "수리 이력 및 불량 유형 데이터를 조회하고 처리 현황을 분석하는 기능을 제공합니다."
            }
        ],
        troubleshooting: [
            {
                title: "대용량 데이터 적재 성능 문제",
                tags: ["MariaDB", "LOAD DATA INFILE", "Bulk Insert", "성능 최적화"],
                problem: "적재해야 할 데이터 양이 매우 많아, 행 단위 INSERT 방식으로는 적재 시간이 지나치게 오래 걸렸습니다. 50만 건 기준 행 단위 INSERT 처리 시 20분 이상이 소요되어 실사용이 어려운 수준이었습니다.",
                solution: "업로드된 CSV 파일을 DB 테이블 스키마에 맞춰 전처리한 임시 파일로 변환한 뒤, MariaDB의 LOAD DATA INFILE 명령을 활용해 파일을 서버에서 직접 bulk import하는 방식으로 전환했습니다. 이 방식은 클라이언트-서버 간 네트워크 왕복 없이 서버 측에서 파일을 직접 읽어 적재하기 때문에, 행 단위 방식 대비 월등히 빠른 처리가 가능합니다.",
                result: "50만 건 기준 적재 시간이 20분 이상에서 5분 내외로 단축되어 약 4배의 성능 개선을 달성했습니다. 실무에서 다루는 대용량 파일도 실질적인 대기 부담 없이 적재가 가능해졌습니다."
            },
            {
                title: "다중 Agent 환경에서의 조회 성능 문제",
                tags: ["MariaDB", "Index", "집계 테이블", "쿼리 최적화"],
                problem: "여러 Agent가 하나의 DB에서 동시에 데이터를 조회하는 상황에서 조회 성능이 중요했습니다. 그러나 데이터가 누적될수록 복합 조건 필터나 피벗 형태의 집계 쿼리에 JOIN·정렬이 수반되어, 조건이 조금만 추가되어도 응답 시간이 수십 초로 길어지는 문제가 발생했습니다.",
                solution: "각 Agent가 자주 조회하는 컬럼 조합을 분석하여 복합 인덱스를 추가했습니다. 또한 Agent들이 가장 빈번하게 참조하는 피벗 형태의 집계 데이터를 미리 계산해두는 집계 테이블을 설계하여, 기존에 실시간으로 JOIN·GROUP BY가 수반되던 복잡한 쿼리를 단순 SELECT로 처리할 수 있도록 개선했습니다.",
                result: "복합 인덱스 도입으로 조건 조회 쿼리 실행 시간이 평균 약 85% 감소하였으며, 집계 테이블 적용 후 주요 리포트 쿼리 응답 시간이 약 22초에서 1초 미만으로 단축되어 실시간 응답에 준하는 수준으로 개선되었습니다."
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
        overview: "스터디 그룹의 출결, 학습 시간, 벌금 정산 등 운영 업무를 자동화하여 방장과 구성원 모두가 학습에 집중할 수 있는 환경을 제공하는 플랫폼",
        tech: ["Java", "Spring", "Vue.js", "MySQL", "Spring Data JPA", "WebRTC (Livekit)", "WebSocket", "Docker", "Jenkins"],
        image: "assets/img/study_architecture.png",
        schedule: "2026.01 - 2026.02 (6주)",
        member: "Infra 1명, Backend 4명, Frontend 1명",
        role: "Backend 개발, ERD 설계 및 WebRTC 환경 구축",
        features: [
            "출결 관리, 벌금 정산 등 스터디 운영 관리 자동화",
            "WebRTC 기반 화상 스터디",
            "스터디 스트리밍 및 채팅 기능",
            "AI 기반 공석 감지 및 비속어 필터링"
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
                title: "WebRTC 기반 화상 스터디",
                description: "LiveKit SFU 서버를 기반으로 안정적인 다인 화상 통화를 제공합니다. 참여자 수가 증가해도 통화 품질이 저하되지 않습니다."
            },
            {
                title: "자동 출결 체크",
                description: "스터디 입장 시 출결이 자동으로 기록됩니다. 방장이 별도로 확인하거나 기록할 필요가 없습니다."
            },
            {
                title: "공부 시간 자동 집계",
                description: "스터디 참여 시간이 실시간으로 기록되어 누적 학습 시간을 언제든 확인할 수 있습니다."
            },
            {
                title: "AI 기반 공석 감지",
                description: "MediaPipe Task Vision의 객체 감지 모델을 활용해 사용자 카메라 화면을 분석합니다. 사람이 감지되지 않으면 학습 시간 집계를 자동으로 일시 정지합니다."
            },
            {
                title: "벌금 자동 정산",
                description: "출결 및 학습 시간 기준에 따라 벌금이 자동 계산됩니다. 정산 결과는 스터디 종료 후 즉시 확인할 수 있습니다."
            },
            {
                title: "실시간 채팅",
                description: "WebSocket 기반 실시간 채팅으로 스터디 중에도 구성원과 원활하게 소통할 수 있습니다."
            }
        ],
        troubleshooting: [
            {
                title: "WebRTC 성능 저하 — Mesh 구조에서 SFU로 전환",
                tags: ["WebRTC", "LiveKit", "SFU", "성능 최적화"],
                problem: "서버 비용을 최소화하기 위해 초기에는 별도의 미디어 서버 없이 참여자들이 직접 P2P 연결하는 Mesh 구조로 WebRTC 환경을 구축했습니다. Mesh 구조는 참여자 수(N)가 늘어날수록 연결 수가 N(N-1)/2 으로 급격히 증가하며, 각 클라이언트가 모든 참여자에게 별도의 스트림을 업로드해야 합니다. 실제 테스트에서 참여자 5명 이상부터 클라이언트 CPU 사용률이 65% 이상으로 치솟고 영상이 끊기는 문제가 발생했습니다.",
                solution: "오픈소스 WebRTC SFU 서버인 LiveKit을 도입했습니다. SFU(Selective Forwarding Unit) 구조에서는 각 클라이언트가 서버에만 스트림을 전송하고, 서버가 이를 다른 참여자에게 선택적으로 포워딩합니다. 클라이언트당 업스트림 연결이 단 1개로 고정되어, 참여자 수가 늘어도 클라이언트 부하 증가가 선형적으로만 증가합니다.",
                result: "5인 기준 클라이언트 평균 CPU 사용률이 약 65%에서 22% 수준으로 감소했습니다. 영상 프레임 드롭률도 35% 이상에서 5% 미만으로 개선되어, 10인 이상의 스터디에서도 안정적인 화상 통화가 가능해졌습니다."
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
            <div class="skills-container">
                ${data.tech.map(t => `<span class="skill-tag">${t}</span>`).join('')}
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
