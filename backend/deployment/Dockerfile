FROM python:3.10-bullseye

WORKDIR /code

RUN pip install --upgrade pip pipenv
RUN apt update && apt install -y --no-install-recommends gcc

COPY ./Pipfile /code/Pipfile
COPY ./Pipfile.lock /code/Pipfile.lock

RUN pipenv sync

COPY . /code/.
COPY ./deployment/.env_deploy /code/.env

CMD [ "pipenv", "run", "dev" ]
