[Figma sketch](https://www.figma.com/proto/7sjBbyxgUdYYqbURStYQUW/Hackathon?page-id=0%3A1&node-id=3-706&viewport=-208%2C149%2C1&t=B9rOxowOZW8cD0QX-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=3%3A706)

# How to run

## 🚀 Install & Setup

```bash
# Install pyenv
curl https://pyenv.run | bash

# Add pyenv to your shell (add to ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

# Install Python and create a virtual environment
pyenv install 3.11.8
pyenv virtualenv 3.11.8 fastapi-env
pyenv local fastapi-env

# Install dependencies
pip install fastapi uvicorn

# Save requirements (optional)
pip freeze > requirements.txt
```
## ▶️ Run Server

```bash
uvicorn main:app --reload
```
