#!/bin/bash
cd /home/kavia/workspace/code-generation/express-backend-application-3f704c00/backend_express
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

