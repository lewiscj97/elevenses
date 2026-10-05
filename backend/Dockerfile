# Development image only. Production images are out of scope for now.
FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_ROOT_USER_ACTION=ignore

# Run as an unprivileged user.
RUN useradd --create-home --uid 1000 app
WORKDIR /app

# Install dependencies first so this layer is cached until pyproject.toml changes.
# The package itself is not installed: the source is bind-mounted at runtime.
COPY pyproject.toml ./
RUN python - <<'EOF' > /tmp/requirements.txt && pip install --no-cache-dir -r /tmp/requirements.txt
import tomllib
with open("pyproject.toml", "rb") as f:
    print("\n".join(tomllib.load(f)["project"]["dependencies"]))
EOF

COPY --chown=app:app . .
USER app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
