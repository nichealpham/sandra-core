# Script to build, push bravo-api-image & start container
docker stop cassandra.user.v1
docker rmi cassandra/user:latest
docker build --rm -t cassandra/user:latest .
# docker tag bravo/api gcr.io/bravodevelopmentnew/bravo-api-image
# docker push gcr.io/bravodevelopmentnew/bravo-api-image
docker run --rm -d --name cassandra.user.v1 -p 4001:4001 cassandra/user:latest