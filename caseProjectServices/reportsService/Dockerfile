FROM python:3.9.13
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY caseProjectServices/reportsService/requirements.txt .
RUN pip install -r ./requirements.txt
COPY . /app

EXPOSE 8002

CMD python caseProjectServices/manage.py runserver 0.0.0.0:8002