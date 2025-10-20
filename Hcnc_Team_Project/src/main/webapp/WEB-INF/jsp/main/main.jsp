<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:include page="../layout/headerlink.jsp" />

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>메인페이지</title>
    <jsp:include page="../layout/headertop.jsp" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <link rel="stylesheet" href="../../../css/egovframework/main.css" />
    <link rel="stylesheet" href="../../../css/component/productItem.css" />
    <link rel="stylesheet" href="../../../js/component/productItem.js" />
  </head>
  <body>
    <div class="container-wrap">
      <jsp:include page="../layout/header.jsp" />

      <div class="container main">
        <main class="main_area">
          <section class="main_banner_area">
            <div class="swiper mainBannerSwiper">
              <div class="swiper-wrapper">
                <c:choose>
                  <c:when test="${not empty mainBanners}">
                    <c:forEach var="banner" items="${mainBanners}">
                      <div class="swiper-slide">
                        <c:choose>
                          <c:when test="${not empty banner['LINKED_URL']}">
                            <a href="${banner['LINKED_URL']}" target="_blank" class="full-link">
                              <div
                                class="img-area"
                                style="
                                  background: url('${banner['IMG_PATH']}')
                                    center center no-repeat;
                                "
                              ></div>
                            </a>
                          </c:when>
                          <c:otherwise>
                            <div
                              class="img-area"
                              style="
                                background: url('${banner['IMG_PATH']}') center
                                  center no-repeat;
                              "
                            ></div>
                          </c:otherwise>
                        </c:choose>
                      </div>
                    </c:forEach>
                  </c:when>
                  <c:otherwise>
                    <div class="swiper-slide">
                      <div class="img-area nodata"></div>
                    </div>
                  </c:otherwise>
                </c:choose>
              </div>
              <div class="main-swiper-pagination"></div>
            </div>
            <script>
              var swiper = new Swiper(".mainBannerSwiper", {
                autoplay: {
                  //자동슬라이드 (false-비활성화)
                  delay: 2500, // 시간 설정
                  disableOnInteraction: false, // false-스와이프 후 자동 재생
                },
                loopAdditionalSlides: 1,
                loop: true,
                pagination: {
                  el: ".main-swiper-pagination",
                },
              });
            </script>
          </section>

          <section class="main-quick">
            <div class="inner">
              <ul class="list flex ju-between">
                <li>
                  <a href="/product/list.do?mainCateId=3">
                    <dl class="flex fd-column">
                      <dt class="icon-area"></dt>
                      <dd>필기구</dd>
                    </dl>
                  </a>
                </li>
                <li>
                  <a href="/product/list.do?mainCateId=4">
                    <dl class="flex fd-column">
                      <dt class="icon-area"></dt>
                      <dd>공책류</dd>
                    </dl>
                  </a>
                </li>
                <li>
                  <a href="/product/list.do?mainCateId=14">
                    <dl class="flex fd-column">
                      <dt class="icon-area"></dt>
                      <dd>화일류</dd>
                    </dl>
                  </a>
                </li>
                <li>
                  <a href="/product/list.do?mainCateId=1">
                    <dl class="flex fd-column">
                      <dt class="icon-area"></dt>
                      <dd>문구류</dd>
                    </dl>
                  </a>
                </li>
                <li>
                  <a href="/product/list.do?mainCateId=5">
                    <dl class="flex fd-column">
                      <dt class="icon-area"></dt>
                      <dd>기타</dd>
                    </dl>
                  </a>
                </li>
                <li>
                  <a href="/product/list.do?mainCateId=4">
                    <dl class="flex fd-column">
                      <dt class="icon-area"></dt>
                      <dd>화방</dd>
                    </dl>
                  </a>
                </li>
                <li>
                  <a href="/recommendlist.do">
                    <dl class="flex fd-column">
                      <dt class="icon-area"></dt>
                      <dd>md 두디픽</dd>
                    </dl>
                  </a>
                </li>
                <li>
                  <a href="/newlist.do">
                    <dl class="flex fd-column">
                      <dt class="icon-area"></dt>
                      <dd>신제품</dd>
                    </dl>
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section class="new_area prd_area">
            <div class="inner">
              <p class="sub-comment" data-aos="fade-up">DOO.D 신상품</p>

              <div
                class="prdList new_list newSwiper"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div class="swiper-wrapper">
                  <c:choose>
                    <c:when test="${not empty newProducts}">
                      <c:forEach
                        var="product"
                        items="${newProducts}"
                        begin="0"
                        end="8"
                      >
                        <%@ include
                        file="/WEB-INF/jsp/component/productItem.jsp" %>
                      </c:forEach>
                    </c:when>
                    <c:otherwise>
                      <div class="prdItem nodata">
                        <div class="nodata">등록된 신상품이 없습니다.</div>
                      </div>
                    </c:otherwise>
                  </c:choose>
                </div>
              </div>

              <script>
                var swiper = new Swiper(".newSwiper", {
                  autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                  },
                  loop: true,
                  loopAdditionalSlides: 1,
                  slidesPerView: 4,
                  spaceBetween: 20,
                  breakpoints: {
                      1080: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                      },
                      960: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                      },
                      760: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                      },
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      }
                    }
                });
              </script>
              <div class="btn-view-more-wrap flex ju-center">
                <!-- 신상품리스트바로가기링크 -->
                <a
                  href="/newlist.do"
                  class="btn-view-more"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  ><span>신상품 더보기</span></a
                >
              </div>
            </div>
          </section>

          <section class="recommend_area prd_area">
            <div class="inner">
              <p class="sub-comment" data-aos="fade-up">DOO.D 추천상품</p>

              <div class="flex ju-between recoSwiper-area">
                <div class="swiper swiper-half recoSwiperSub">
                  <div class="swiper-wrapper swiper-right">
                    <!-- 시작:상품리스트 변수 -->
                    <c:choose>
                      <c:when test="${not empty recommendProducts}">
                        <c:forEach
                          var="product"
                          items="${recommendProducts}"
                          begin="0"
                          end="8"
                        >
                          <%@ include
                          file="/WEB-INF/jsp/component/productItem.jsp" %>
                        </c:forEach>
                      </c:when>
                      <c:otherwise>
                        <div class="swiper-slide prdItem nodata">
                          <div class="nodata">등록된 추천상품이 없습니다.</div>
                        </div>
                      </c:otherwise>
                    </c:choose>
                    <!-- 종료:상품리스트 변수 -->
                  </div>
                </div>
                <div thumbsSlider="" class="swiper swiper-half recoSwiper">
                  <div class="swiper-wrapper swiper-right">
                    <!-- 시작:상품리스트 변수 -->
                    <c:choose>
                      <c:when test="${not empty recommendProducts}">
                        <c:forEach
                          var="product"
                          items="${recommendProducts}"
                          begin="0"
                          end="3"
                        >
                          <%@ include
                          file="/WEB-INF/jsp/component/productItem.jsp" %>
                        </c:forEach>
                      </c:when>
                      <c:otherwise>
                        <div class="swiper-slide prdItem nodata">
                          <div class="nodata">등록된 추천상품이 없습니다.</div>
                        </div>
                      </c:otherwise>
                    </c:choose>
                    <!-- 종료:상품리스트 변수 -->
                  </div>
                </div>
              </div>

              <div class="btn-view-more-wrap flex ju-center">
                <!-- 추천상품리스트바로가기링크 -->
                <a
                  href="/recommendlist.do"
                  class="btn-view-more"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  ><span>추천상품 더보기</span></a
                >
              </div>
              <script>
				  var swiper = new Swiper(".recoSwiper", {
				    loop: true,
				    spaceBetween: 20,
				    slidesPerView: 2,
				    grid: {
				      rows: 2, // 세로 2줄
				      fill: "row", // row 기준으로 채우기
				    },
				    freeMode: true,
				    watchSlidesProgress: true,
				    // 여기에 추가 ↓
				    breakpoints: {
				      960: {
				        slidesPerView: 2,
				        spaceBetween: 20,
				        grid: { rows: 2 }
				      },
				      760: {
				        slidesPerView: 2,
				        spaceBetween: 15,
				        grid: { rows: 1 }
				      },
				      0: {
				        slidesPerView: 1,
				        spaceBetween: 10,
				        grid: { rows: 1 }
				      }
				    }
				  });
				  
				  var swiper2 = new Swiper(".recoSwiperSub", {
				    loop: true,
				    spaceBetween: 20,
				    autoplay: {
				      delay: 2500,
				      disableOnInteraction: false,
				    },
				    thumbs: {
				      swiper: swiper,
				    },
				  });
				  
				  swiper2.on("slideChange", function () {
				    const activeIndex = swiper2.realIndex;
				    $(".recoSwiper .prdInfo").removeClass("showon");
				    $(".recoSwiper .prdInfo").eq(activeIndex).addClass("showon");
				  });
				  
				  document
				    .querySelectorAll(".recoSwiper .prdLink")
				    .forEach((link) => {
				      link.addEventListener("click", function (e) {
				        e.preventDefault();
				      });
				    });
				</script>
            </div>
          </section>

          <section class="shortbanner_area">
            <a href="#">
              <div class="inner">
                <div class="chardood"></div>
                <div class="banenr-cont"></div>
              </div>
            </a>
          </section>

          <section class="hot_area prd_area">
            <div class="inner">
              <p class="sub-comment" data-aos="fade-up">DOO.D 인기상품</p>
              <div
                class="prdList hot_list hotSwiper"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div class="swiper-wrapper">
                  <!-- 시작:상품리스트 변수 -->
                  <c:choose>
                    <c:when test="${not empty hotProducts}">
                      <c:forEach
                        var="product"
                        items="${hotProducts}"
                        begin="0"
                        end="8"
                      >
                        <%@ include
                        file="/WEB-INF/jsp/component/productItem.jsp" %>
                      </c:forEach>
                    </c:when>
                    <c:otherwise>
                      <div class="swiper-slide prdItem nodata">
                        <div class="nodata">등록된 인기상품이 없습니다.</div>
                      </div>
                    </c:otherwise>
                  </c:choose>
                  <!-- 종료:상품리스트 변수 -->
                </div>
              </div>

              <div class="btn-view-more-wrap flex ju-center">
                <!-- 추천리스트바로가기링크 -->
                <a
                  href="/hotlist.do"
                  class="btn-view-more"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  ><span>인기상품 더보기</span></a
                >
              </div>
              <script>
                var swiper = new Swiper(".hotSwiper", {
                  autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                  },
                  loop: true,
                  loopAdditionalSlides: 1,
                  slidesPerView: 4,
                  spaceBetween: 20, // 슬라이드 사이 여백(px)
                  pagination: {
                    el: ".hot-swiper-pagination",
                    clickable: true,
                  },
                  breakpoints: {
                      1080: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                      },
                      960: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                      },
                      760: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                      },
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      }
                    }
                });
              </script>
            </div>
          </section>
        </main>
      </div>

      <jsp:include page="../layout/popup.jsp" />
      <jsp:include page="../layout/footer.jsp" />
    </div>
    <script>
      AOS.init();
    </script>
  </body>
</html>
