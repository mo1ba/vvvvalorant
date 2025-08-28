// 에이전트 분류 데이터
const agentCategories = {
    '타격대': ['네온', '레이나', '레이즈', '아이소', '요루', '웨이레이', '제트', '피닉스'],
    '척후대': ['게코', '브리치', '소바', '스카이', '케이/오', '테호', '페이드'],
    '감시자': ['데드록', '바이스', '사이퍼', '세이지', '체임버', '킬조이'],
    '전략가': ['바이퍼', '브림스톤', '아스트라', '오멘', '클로브', '하버']
};

// 에이전트 필터링 함수
function filterAgents(category, clickedElement) {
    const agentsContainer = document.querySelector('.agents_container');
    const agentGrids = document.querySelectorAll('.agent_grid');
    const moreBtnWrap = document.querySelector('.more_btn_wrap');
    
    // 모든 카테고리 버튼의 active 클래스 제거
    const categoryButtons = document.querySelectorAll('.agent_category li');
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    
    // 클릭된 버튼에 active 클래스 추가
    if (clickedElement) {
        clickedElement.parentElement.classList.add('active');
    }
    
    if (category === '모두') {
        // 모든 에이전트 보이기 - 원래 구조 복원
        agentGrids.forEach(grid => grid.style.display = 'grid');
        if (moreBtnWrap) moreBtnWrap.style.display = '';
        
        // 필터된 컨테이너 숨기기
        const filteredContainer = document.getElementById('filtered-container');
        if (filteredContainer) {
            filteredContainer.style.display = 'none';
        }
    } else {
        // 기존 구조를 숨기고 필터된 에이전트만 표시
        agentGrids.forEach(grid => grid.style.display = 'none');
        if (moreBtnWrap) moreBtnWrap.style.display = 'none';
        
        // 필터된 에이전트들을 담을 새로운 컨테이너 생성 또는 업데이트
        let filteredContainer = document.getElementById('filtered-container');
        if (!filteredContainer) {
            filteredContainer = document.createElement('div');
            filteredContainer.id = 'filtered-container';
            filteredContainer.className = 'agent_grid';
            agentsContainer.appendChild(filteredContainer);
        }
        
        // 컨테이너 비우기
        filteredContainer.innerHTML = '';
        
        // 선택된 카테고리의 에이전트만 새 컨테이너에 복사
        const categoryAgents = agentCategories[category];
        const allAgents = document.querySelectorAll('.hoverbox:not(.empty)');
        
        allAgents.forEach(agent => {
            const agentNameElement = agent.querySelector('.agent_txtbox span');
            if (agentNameElement) {
                const agentName = agentNameElement.textContent.trim();
                
                if (categoryAgents.includes(agentName)) {
                    const clonedAgent = agent.cloneNode(true);
                    filteredContainer.appendChild(clonedAgent);
                }
            }
        });
        
        // 컨테이너 표시
        filteredContainer.style.display = 'grid';
    }
}

// 페이지 로드 시 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    // CSS 스타일 추가 (active 클래스용)
    const style = document.createElement('style');
    style.textContent = `
        .agent_category>li.active {
            border-bottom: 4px solid #ff4654 !important;
        }
        .agent_category>li.active a {
            color: #ff4654 !important;
        }
        
        /* 반응형 호버 효과 비활성화 (터치 기기) */
        @media (hover: none) {
            .hoverbox:hover {
                transform: none !important;
            }
            .agent_category>li:hover {
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 카테고리 버튼들에 클릭 이벤트 추가
    const categoryLinks = document.querySelectorAll('.agent_category a');
    
    categoryLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const categories = ['모두', '타격대', '감시자', '전략가', '척후대'];
            const selectedCategory = categories[index];
            
            filterAgents(selectedCategory, this);
        });
        
        // 터치 이벤트 추가 (모바일 지원)
        link.addEventListener('touchstart', function(e) {
            // 터치 시작 시 시각적 피드백
            this.style.opacity = '0.7';
        });
        
        link.addEventListener('touchend', function(e) {
            // 터치 종료 시 원상복구
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
        });
    });
    
    // 첫 번째 카테고리(모두)를 기본 활성화
    const firstCategory = document.querySelector('.agent_category li');
    if (firstCategory) {
        firstCategory.classList.add('active');
    }
    
    // 화면 크기 변경 감지 및 필터 컨테이너 조정
    window.addEventListener('resize', function() {
        const filteredContainer = document.getElementById('filtered-container');
        if (filteredContainer && filteredContainer.style.display === 'grid') {
            // 현재 활성화된 카테고리 재적용
            const activeCategory = document.querySelector('.agent_category li.active a');
            if (activeCategory) {
                const categoryText = activeCategory.textContent.trim();
                filterAgents(categoryText, activeCategory);
            }
        }
    });
});