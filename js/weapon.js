$(document).ready(function() {
    let expanded = false;

    // 필터 버튼 클릭 이벤트
    $('.filter_btn').click(function(){
        // 모든 버튼에서 active 클래스 제거
        $('.filter_btn').removeClass('active');
        // 클릭된 버튼에 active 클래스 추가
        $(this).addClass('active');

        let filterValue = $(this).data('filter');
        
        if (filterValue === '전체'){
            if (expanded || window.innerWidth > 1024) {
                $('.weapon_box').show();
            } else {
                $('.weapon_box:not(.hide)').show();
                $('.hide').hide();
            }
        } else {
            $('.weapon_box').hide();
            if (expanded || window.innerWidth > 1024) {
                $(`.weapon_box[data-filter="${filterValue}"]`).show();
            } else {
                $(`.weapon_box[data-filter="${filterValue}"]:not(.hide)`).show();
            }
        }
    });
    
    // 더보기 버튼 기능
    $('.more_btn').click(function() {
        if (!expanded) {
            $('.weapon_box').show();
            $(this).text('접기');
            expanded = true;
        } else {
            // 현재 활성화된 필터에 따라 표시
            let activeFilter = $('.filter_btn.active').data('filter');
            if (activeFilter === '전체') {
                $('.hide').hide();
            } else {
                $('.weapon_box').hide();
                $(`.weapon_box[data-filter="${activeFilter}"]:not(.hide)`).show();
            }
            $(this).text('더보기');
            expanded = false;
        }
    });

    // 화면 크기 변경 시 필터 재적용
    $(window).resize(function() {
        if (window.innerWidth > 1024) {
            $('.weapon_box').show();
            $('.more_btn_wrap').hide();
        } else {
            $('.more_btn_wrap').show();
            if (!expanded) {
                $('.hide').hide();
            }
        }
    });
});