#!/bin/bash

yarn docs

if [[ -n $(git status --porcelain) ]]; then echo "❗️ Uncommitted documentation changes"; git status --porcelain; exit 1; fi
