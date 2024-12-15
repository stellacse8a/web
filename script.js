// 필터 버튼 클릭 이벤트 처리
document.getElementById('filterBtn').addEventListener('click', () => {
    const building = document.getElementById('building').value;
    const rating = document.getElementById('rating').value;
    const recent = document.getElementById('recent').checked;

    // 예제 결과 데이터
    const results = [
        { name: 'Building A - 1st Floor', rating: 5, recent: true },
        { name: 'Building B - 2nd Floor', rating: 4, recent: false },
        { name: 'Building C - 1st Floor', rating: 3, recent: true }
    ];

    // 필터링 로직
    const filteredResults = results.filter(restroom => {
        const matchesBuilding = !building || restroom.name.includes(building);
        const matchesRating = !rating || restroom.rating >= Number(rating);
        const matchesRecent = !recent || restroom.recent;
        return matchesBuilding && matchesRating && matchesRecent;
    });

    // 검색 결과 업데이트
    const restroomList = document.getElementById('restroomList');
    const noResultsMessage = document.getElementById('noResultsMessage');
    restroomList.innerHTML = '';

    if (filteredResults.length > 0) {
        noResultsMessage.style.display = 'none';
        filteredResults.forEach(restroom => {
            const li = document.createElement('li');
            li.className = 'restroom-card';
            li.innerHTML = `<h3>${restroom.name}</h3><p>Rating: ${restroom.rating} Stars</p>`;
            restroomList.appendChild(li);
        });
    } else {
        noResultsMessage.style.display = 'block';
    }
});

// 로딩 상태 표시
const filterBtn = document.getElementById('filterBtn');
filterBtn.addEventListener('click', () => {
    filterBtn.textContent = 'Loading...';
    setTimeout(() => {
        filterBtn.textContent = 'Apply Filters';
    }, 1000);
});

// 로컬 스토리지에서 필터 값 로드
window.onload = () => {
    document.getElementById('building').value = localStorage.getItem('building') || '';
    document.getElementById('rating').value = localStorage.getItem('rating') || 
