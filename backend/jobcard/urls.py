# from django.urls import path
# from .views import JobCardCreate, JobCardDetail, JobCardPDF

# urlpatterns = [
#     path('job-card/', JobCardCreate.as_view()),
#     path('job-card/<int:pk>/', JobCardDetail.as_view()),
#     path('job-card/<int:pk>/pdf/', JobCardPDF.as_view()),  # PDF endpoint
# ]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobCardViewSet

router = DefaultRouter()
router.register(r'jobcards', JobCardViewSet, basename='jobcard')

urlpatterns = [
    path('', include(router.urls)),
]
