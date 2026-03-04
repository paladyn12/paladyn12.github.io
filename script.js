const projectData = {
    project4: {
        title: "대용량 데이터 처리 플랫폼",
        date: "2026.02.19 - 2026.04.03 (7주)",
        institution: "삼성전자 네트워크 사업부",
        overview: "대규모의 인벤토리, 불량 처리 데이터를 통합 관리하는 플랫폼 개발",
        tech: ["Python", "FastAPI", "Streamlit", "LangChain", "LangGraph", "MariaDB"],
        architecture: "Client -> API Gateway -> Service(Study, Member, Attendance) -> DB\n                     |\n                     -> AI Service (Python)",
        schedule: "2026.02 - 2026.04",
        member: "PM 1명, Backend 3명, Frontend 1명, Infra 1명",
        role: "인프라 구축, Schema 설계, DB 적재 Agent 개발",
        features: [
            "DB 적재 Agent 개발",
            "Q&A Agent 개발",
            "Report Agent 개발"
        ]
    },
    project1: {
        title: "AI 기반 온라인 스터디 관리 자동화 플랫폼",
        date: "2026.01 - 2026.02",
        institution: "SSAFY",
        overview: "스터디 그룹의 일정 관리와 출석 체크를 자동화하여 운영 효율성을 높이는 플랫폼",
        tech: ["Java", "Spring", "Vue.js", "MySQL", "Spring Data JPA", "WebRTC (Livekit)", "WebSocket", "Docker", "Jenkins"],
        architecture: "Client -> API Gateway -> Service(Study, Member, Attendance) -> DB\n                     |\n                     -> AI Service (Python)",
        image: "assets/img/study_architecture.png",

        schedule: "2026.01 - 2026.02 (6주)",
        member: "Infra 1명 Backend 4명, Frontend 1명",
        role: "Backend 개발, ERD 설계 및 WebRTC 환경 구축",
        features: [
            "출결 관리, 벌금 정산 등 스터디 운영 관리 자동화",
            "WebRTC 기반 화상 스터디",
            "스터디 스트리밍 및 채팅 기능",
            "AI 기반 공석 감지 및 비속어 필터링"
        ]
    },
    project2: {
        title: "Gamification 기반 LMS 사이트",
        date: "2025.06 (3주)",
        institution: "구름톤 딥다이브",
        overview: "학습자들의 동기 부여를 위해 레벨, 미션 등 게임 요소를 적용한 학습 관리 시스템(LMS)",
        tech: ["Java", "Spring", "React", "MySQL", "Spring Data JPA", "Docker"],
        architecture: "Client -> Web Server -> Application Server -> DB <-> Redis (Leaderboard)",

        schedule: "2025.06 (3주)",
        member: "PM 1명, Infra 1명, Backend 2명, Frontend 2명",
        role: "Backend 개발, DB 설계, 퀘스트 시스템 구현",
        features: [
            "사용자 레벨 및 경험치 시스템",
            "미션 수행 및 퀘스트 클리어 기능",
            "일일/주간 랭킹 보드",
            "관리자 대시보드"
        ]
    },
    project3: {
        title: "웹 IDE 기반 모의 코테 사이트",
        date: "2025.12 (3주)",
        institution: "SSAFY",
        overview: "웹 IDE 기반 모의 코딩 테스트 플랫폼",
        tech: ["Java", "Spring", "Vue.js", "MyBatis", "MySQL", "Docker"],
        architecture: "Client <-> WebSocket Server <-> Docker Container Manager -> Execution Containers",
        image: "assets/img/cote_architecture.png",

        schedule: "2025.12 (3주)",
        member: "FullStack 2명",
        role: "FullStack 개발, DB 설계, 웹 IDE 기능 구현",
        features: [
            "실시간 코드 실행 및 마크다운 메모",
            "문제 크롤링 및 화면 구성",
            "문제 풀이를 돕는 AI 챗봇"
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-button');
    const projectCards = document.querySelectorAll('.project-card');

    // Modal Elements
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalBody = document.getElementById('modal-body');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            const data = projectData[projectId];

            if (data) {
                // Update specific project4 title to not include institution if we want, 
                // but the user just said 'put institution on the card'. 
                // In modal, we might want to show it too? 
                // I'll stick to the existing modal layout unless asked, 
                // but adding institution to the modal header might be nice.
                // For now, I'll allow the modal to show the Title and Date as before.

                modalTitle.textContent = data.title;
                // Maybe append institution to date or title?
                // Let's keep it simple for now, or maybe add it to the date line.
                modalDate.textContent = `${data.institution} | ${data.date}`;

                let architectureSection = '';
                if (data.image) {
                    architectureSection = `
                    <div class="project-detail-section">
                        <h4>아키텍처</h4>
                        <img src="${data.image}" alt="${data.title} Architecture" class="architecture-image">
                    </div>
                    `;
                }

                // Feature List Generation
                const featuresHtml = data.features ? data.features.map(f => `<li>${f}</li>`).join('') : '';

                let contentHtml = `
                    <div class="project-detail-section">
                        <h4>프로젝트 개요</h4>
                        <p>${data.overview}</p>
                    </div>

                    <!-- New Sections -->
                    <div class="project-meta-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
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

                modalBody.innerHTML = contentHtml;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling

                // Add event listener to the image for zooming
                const archImg = modalBody.querySelector('.architecture-image');
                if (archImg) {
                    archImg.addEventListener('click', () => {
                        const zoomModal = document.getElementById('image-zoom-modal');
                        const zoomImg = document.getElementById('zoomed-image');
                        zoomImg.src = archImg.src;
                        zoomModal.style.display = 'flex'; // Use flex for centering
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

    // Image Zoom Modal Event Listeners
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
