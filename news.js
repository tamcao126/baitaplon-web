const newsData = [
    {
        id:1,
        category: "SỰ KIỆN THỜI TRANG",
        catClass: "fashion",
        title: "Fashion Forward 2025 tôn vinh phong cách thời trang bền vững",
        excerpt: "Fashion Forward 2025 là sự kiện thời trang lớn nhất năm quy tụ các nhà thiết kế trẻ, giới thiệu những bộ sưu tập hướng đến bảo vệ môi trường và phát triển bền vững...",
        author: "BAN TỔ CHỨC",
        time: "3 GIỜ TRƯỚC",
        image: 'https://i.pinimg.com/736x/83/09/cf/8309cfa58b28188e052388a4d4cce3b6.jpg'
    },
    {
        id:2,
        category: "WORKSHOP",
        catClass: "workshop",
        title: "Workshop kỹ năng phối đồ cá nhân thu hút giới trẻ",
        excerpt: "Workshop mang đến cho người tham dự kiến thức thực tế về cách lựa chọn trang phục, phối màu và xây dựng phong cách cá nhân phù hợp với từng hoàn cảnh...",
        author: "NGUYỄN THU HÀ",
        time: "6 GIỜ TRƯỚC",
        image: "https://i.pinimg.com/736x/c0/32/f3/c032f356ade7cf16b339720479083c62.jpg"
    },
    {
        id:3,
        category: "SỰ KIỆN NGHỆ THUẬT",
        catClass: "art",
        title: "Triển lãm nghệ thuật kết hợp trình diễn thời trang độc đáo",
        excerpt: "Triển lãm kết hợp giữa nghệ thuật thị giác và trình diễn thời trang, mang đến trải nghiệm mới mẻ cho người tham dự yêu thích sáng tạo và cái đẹp...",
        author: "Lê Hoàng Minh",
        time: "1 ngày trước",
        image: "https://i.pinimg.com/1200x/50/9d/0a/509d0a7073ac2ec128dc924576bcb6ff.jpg"

},
{
    id:4,
    category: "SỰ KIỆN CỘNG ĐỒNG",
    catClass: "community",
    title: "Ngày hội cộng đồng kết nối các dự án xã hội và tình nguyện",
    excerpt: "Ngày hội cộng đồng tạo không gian để các tổ chức xã hội, nhóm tình nguyện và người tham dự giao lưu, chia sẻ và cùng nhau tạo ra những giá trị tích cực...",
    author: "Ban tổ chức Ngày hội Cộng đồng",
    time: "2 ngày trước",
    image: "https://i.pinimg.com/736x/6d/8a/bb/6d8abba6dd895edcdc31e34aacb0a7fe.jpg"

},
{
    id:5,
    category: "WORKSHOP",
    catClass: "workshop",
    title: "Workshop làm đồ thủ công truyền thống dành cho người mới bắt đầu",
    excerpt: "Workshop hướng dẫn người tham dự tự tay tạo ra các sản phẩm thủ công đơn giản, giúp thư giãn tinh thần và hiểu hơn về giá trị văn hóa truyền thống...",
    author: "Trần Mai Phương",
    time: "2 ngày trước",
    image: "https://i.pinimg.com/1200x/62/d8/95/62d895be873abe61579df45605900e6d.jpg"
}

];
let currentIndex = 3; // Số tin hiển thị ban đầu
const newsPerPage = 2; // Mỗi lần bấm "Xem thêm" hiện thêm 3 tin

function renderNews() {
    const container = document.getElementById('news-container');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!container) return;

    // Lấy dữ liệu theo chỉ số hiện tại
    const visibleNews = newsData.slice(0, currentIndex);

    container.innerHTML = visibleNews.map(post => `
        <article class="news-card" onclick="viewDetail(${post.id})">
            <div class="news-image">
                <img src="${post.image}" alt="news">
            </div>
            <div class="news-content">
                <p class="category">${post.category}</p>
                <h2 class="news-title">${post.title}</h2>
                <p class="news-excerpt">${post.excerpt}</p>
                <p class="news-meta">${post.author.toUpperCase()} | ${post.time}</p>
            </div>
        </article>
    `).join('');

    // Kiểm tra và ẩn hiện nút Xem thêm (Thêm dấu ? để tránh lỗi nếu không có nút)
    if (loadMoreBtn) {
        if (currentIndex >= newsData.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
}

// KHỞI TẠO TẤT CẢ TRONG MỘT DOMCONTENTLOADED
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render ban đầu
    renderNews();

    // 2. Xử lý Xem thêm
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentIndex += newsPerPage;
            renderNews();
        });
    }

    // 3. Xử lý Tìm kiếm và Gợi ý
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.getElementById('search-bar');
    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('search-suggestions');

    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) searchInput.focus();
    });

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        suggestionsBox.innerHTML = ''; 

        if (query.length > 0) {
            const filteredNews = newsData.filter(item => item.title.toLowerCase().includes(query));
            if (filteredNews.length > 0) {
                filteredNews.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.innerHTML = item.title;
                    div.onclick = () => {
                        searchInput.value = item.title;
                        searchBar.classList.remove('active');
                        suggestionsBox.style.display = 'none';

                        viewDetail(item.id);
                    };
                    suggestionsBox.appendChild(div);
                });
                suggestionsBox.style.display = 'block';
            } else {
                suggestionsBox.style.display = 'none';
            }
        } else {
            suggestionsBox.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !searchIcon.contains(e.target)) {
            searchBar.classList.remove('active');
            suggestionsBox.style.display = 'none';
        }
    });
});

// Hàm hiển thị Modal (Giữ nguyên)
function viewDetail(id) {
    const post = newsData.find(n => n.id === id);
    const modal = document.getElementById('newsModal');
    const modalBody = document.getElementById('modal-body');
    
    if (post && modal && modalBody) {
        modalBody.innerHTML = `
            <img src="${post.image}" style="width:100%; border-radius:8px; margin-bottom:20px; height: 400px; object-fit: cover;">
            <p style="color:#ff3e6c; font-weight:800; font-size: 14px; margin-bottom: 10px;">${post.category}</p>
            <h1 style="font-size:32px; margin-bottom:20px; color: #000; font-weight: 900;">${post.title}</h1>
            <p style="color:#444; line-height:1.8; font-size: 16px;">${post.excerpt}</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-weight: bold; color: #000;">
                Tác giả: ${post.author} | ${post.time}
            </div>
        `;
        modal.style.display = 'block'; // Hiện modal lên
        document.body.style.overflow = 'hidden'; // Khóa cuộn trang khi đang xem tin
    }
}

// Hiệu ứng Header đổi màu khi cuộn chuột
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Thêm đoạn này vào bên trong DOMContentLoaded hoặc cuối file news.js
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('newsModal');
    const closeBtn = document.querySelector('.close-btn');

    // 1. Khi nhấn vào nút X
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Cho phép cuộn trang lại
        }
    }

    // 2. Khi nhấn ra ngoài vùng Modal Content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }
});