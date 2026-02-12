const projectData = {
    project4: {
        title: "대용량 데이터 처리 플랫폼",
        date: "2026.02 - 2026.04",
        institution: "삼성전자 네트워크 사업부",
        overview: "대규모 트래픽과 데이터를 효율적으로 처리하기 위한 분산 처리 시스템 구축 프로젝트입니다. Kafka와 Spark를 활용하여 실시간 데이터 파이프라인을 구축했습니다.",
        tech: ["Java", "Spring Boot", "Kafka", "Spark", "Hadoop"],
        architecture: "Data Source -> Kafka -> Spark Streaming -> HDFS/DB -> API Server",
        // No image provided yet, so leaving it undefined or handled by default logic

        // Dummy Data
        schedule: "2026.02 - 2026.04 (8주)",
        member: "Backend 4명, Data Engineer 2명",
        role: "데이터 파이프라인 구축, Kafka 클러스터 운영",
        features: [
            "실시간 로그 수집 및 분석",
            "대용량 배치 처리 시스템",
            "데이터 시각화 대시보드",
            "장애 대응 및 모니터링 시스템"
        ]
    },
    project1: {
        title: "AI 기반 온라인 스터디 관리 자동화 플랫폼",
        date: "2026.01 - 2026.02",
        institution: "SSAFY",
        overview: "본 프로젝트는 스터디 그룹의 일정 관리와 출석 체크를 자동화하여 운영 효율성을 높이는 플랫폼입니다. AI를 활용하여 스터디원의 참여도를 분석하고, 자동화된 알림 서비스를 제공합니다.",
        tech: ["Java", "Spring Boot", "MySQL", "JPA", "Python (AI Model)"],
        architecture: "Client -> API Gateway -> Service(Study, Member, Attendance) -> DB\n                     |\n                     -> AI Service (Python)",
        image: "assets/img/study_architecture.png",

        schedule: "2026.01 - 2026.02 (6주)",
        member: "Backend 3명, Frontend 2명",
        role: "팀장, Backend 리드, API 설계 및 CI/CD 구축",
        features: [
            "스터디 생성 및 멤버 관리",
            "AI 기반 자동 출석 체크",
            "실시간 학습 시간 측정",
            "스터디 랭킹 시스템"
        ]
    },
    project2: {
        title: "Gamification 기반 LMS 사이트",
        date: "2025.06",
        institution: "구름톤 딥다이브",
        overview: "학습자들의 동기 부여를 위해 레벨, 배지, 랭킹 시스템 등 게임 요소를 적용한 학습 관리 시스템(LMS)입니다. 사용자의 학습 활동에 따라 실시간으로 경험치가 부여됩니다.",
        tech: ["Java", "Spring Boot", "Spring Security", "Redis"],
        architecture: "Client -> Web Server -> Application Server -> DB <-> Redis (Leaderboard)",

        schedule: "2025.06 (4주)",
        member: "Backend 2명, Frontend 2명",
        role: "Backend 개발, DB 설계, Redis 랭킹 시스템 구현",
        features: [
            "사용자 레벨 및 경험치 시스템",
            "일일/주간 랭킹 보드",
            "게시판 및 댓글 기능",
            "관리자 대시보드"
        ]
    },
    project3: {
        title: "웹 IDE 기반 모의 코테 사이트",
        date: "2025.12",
        institution: "SSAFY",
        overview: "웹 브라우저 상에서 직접 코드를 작성하고 실행해볼 수 있는 모의 코딩 테스트 플랫폼입니다. Docker를 활용한 격리된 실행 환경을 제공하여 보안성을 확보했습니다.",
        tech: ["Java", "Spring Boot", "Docker", "WebSocket"],
        architecture: "Client <-> WebSocket Server <-> Docker Container Manager -> Execution Containers",
        image: "assets/img/cote_architecture.png",

        schedule: "2025.12 (4주)",
        member: "Backend 3명, Frontend 3명",
        role: "Backend 개발, Docker 컨테이너 오케스트레이션",
        features: [
            "실시간 코드 실행 및 채점",
            "문제 풀이 및 제출 이력 관리",
            "실시간 채팅 (WebSocket)",
            "관리자 문제 등록 시스템"
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

                let architectureContent = '';
                if (data.image) {
                    architectureContent = `<img src="${data.image}" alt="${data.title} Architecture" class="architecture-image">`;
                } else {
                    architectureContent = `
                        <div class="architecture-placeholder">
                            ${data.architecture.replace(/\n/g, '<br>')}
                            <br><br>(아키텍처 이미지 준비중)
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
                    
                    <div class="project-detail-section">
                        <h4>아키텍처</h4>
                        ${architectureContent}
                    </div>
                `;

                modalBody.innerHTML = contentHtml;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
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
});
