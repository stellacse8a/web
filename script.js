// 필터링 로직 (search.html에서 사용)
if (document.getElementById('filterBtn')) {
    document.getElementById('filterBtn').addEventListener('click', () => {
        const building = document.getElementById('building').value;
        const rating = document.getElementById('rating').value;
        const recent = document.getElementById('recent').checked;

        // 가상의 화장실 데이터
        const results = [
            { name: '중앙도서관 - 1층', rating: 4.8, recent: true },
            { name: '중앙도서관 - 2층', rating: 4.5, recent: false },
            { name: '인문사회관 - 1층', rating: 4.2, recent: true },
            { name: '인문사회관 - 2층', rating: 3.9, recent: true },
            { name: '제1과학관 - 1층', rating: 4.6, recent: true },
            { name: '제1과학관 - 2층', rating: 4.3, recent: false },
            { name: '제2과학관 - 1층', rating: 4.1, recent: true },
            { name: '제2과학관 - 2층', rating: 3.7, recent: false },
            { name: '학생누리관 - 1층', rating: 4.4, recent: true },
            { name: '학생누리관 - 2층', rating: 4.0, recent: true },
            { name: '50주년기념관 - 1층', rating: 4.9, recent: true },
            { name: '50주년기념관 - 2층', rating: 4.7, recent: false }
        ];

        // 필터링 로직
        const filteredResults = results.filter(restroom => {
            const matchesBuilding = !building || restroom.name.includes(building);
            const matchesRating = !rating || restroom.rating >= Number(rating);
            const matchesRecent = !recent || restroom.recent;
            return matchesBuilding && matchesRating && matchesRecent;
        });

        // 결과 출력
        const restroomList = document.getElementById('restroomList');
        const noResultsMessage = document.getElementById('noResultsMessage');
        restroomList.innerHTML = '';

        if (filteredResults.length > 0) {
            noResultsMessage.style.display = 'none';
            filteredResults.forEach(restroom => {
                const li = document.createElement('li');
                li.className = 'restroom-card';
                li.innerHTML = `<h3>${restroom.name}</h3><p>평점: ${restroom.rating} 별</p>`;
                restroomList.appendChild(li);
            });
        } else {
            noResultsMessage.style.display = 'block';
        }
    });

    // 필터 버튼 로딩 상태 표시
    const filterBtn = document.getElementById('filterBtn');
    filterBtn.addEventListener('click', () => {
        filterBtn.textContent = '로딩 중...';
        setTimeout(() => {
            filterBtn.textContent = '필터 적용';
        }, 1000);
    });

    // 로컬 스토리지에 필터 값 저장
    window.onload = () => {
        document.getElementById('building').value = localStorage.getItem('building') || '';
        document.getElementById('rating').value = localStorage.getItem('rating') || '';
    };

    filterBtn.addEventListener('click', () => {
        localStorage.setItem('building', document.getElementById('building').value);
        localStorage.setItem('rating', document.getElementById('rating').value);
    });
}

// 리뷰 작성 폼 제출 로직 (submit.html에서 사용)
if (document.getElementById('reviewForm')) {
    document.getElementById('reviewForm').addEventListener('submit', (e) => {
        e.preventDefault(); // 기본 제출 방지
        const building = document.getElementById('building').value;
        const cleanliness = document.querySelector('input[name="cleanliness"]:checked')?.value || 0;
        const convenience = document.querySelector('input[name="convenience"]:checked')?.value || 0;
        const crowdedness = document.querySelector('input[name="crowdedness"]:checked')?.value || 0;
        const review = document.getElementById('review').value;

        alert(`리뷰가 제출되었습니다:\n건물: ${building}\n청결도: ${cleanliness}점\n편의성: ${convenience}점\n혼잡도: ${crowdedness}점\n리뷰 내용: ${review}`);
    });
}

// 사진 업로드 미리보기 기능 (submit.html에서 사용)
if (document.getElementById('photo')) {
    document.getElementById('photo').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgPreview = document.createElement('img');
                imgPreview.src = e.target.result;
                imgPreview.style.maxWidth = '100%';
                imgPreview.style.marginTop = '1rem';
                imgPreview.style.borderRadius = '10px';

                const previewContainer = document.getElementById('photo-preview');
                previewContainer.innerHTML = ''; // 기존 미리보기 초기화
                previewContainer.appendChild(imgPreview);
            };
            reader.readAsDataURL(file);
        }
    });
}
