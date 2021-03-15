include .env

upAndRm:
	make up
	read -p "Press enter to remove the stack"
	make rm

up:
	aws cloudformation create-stack \
    --stack-name bible-translation \
    --profile seriousCookies \
    --region eu-north-1 \
    --template-body file://template.yaml \
    --parameters file://parameters.json

rm:
	aws cloudformation delete-stack \
 		--stack-name bible-translation \
    --profile seriousCookies \
    --region eu-north-1 \
