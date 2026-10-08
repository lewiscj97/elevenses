# Development image only. Production images are out of scope for now.
FROM python:3.13.16-slim@sha256:3dd7cc108ec1493442514f5c2a871af6af0ec31d768ff6e378a93340c3b3db5f

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_ROOT_USER_ACTION=ignore

# Run as an unprivileged user.
RUN useradd --create-home --uid 1000 app
WORKDIR /app

# Install dependencies first so this layer is cached until pyproject.toml changes.
# The package itself is not installed: the source is bind-mounted at runtime.
# The dev group (pytest, ruff, mypy) is included so the checks run inside this container.
COPY pyproject.toml ./
RUN python - <<'EOF' > /tmp/requirements.txt && pip install --no-cache-dir -r /tmp/requirements.txt
import tomllib
with open("pyproject.toml", "rb") as f:
    pyproject = tomllib.load(f)
print("\n".join(pyproject["project"]["dependencies"] + pyproject["dependency-groups"]["dev"]))
EOF

COPY --chown=app:app . .
USER app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
