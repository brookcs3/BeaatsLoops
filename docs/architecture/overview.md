# Architecture Overview

```mermaid
flowchart TD
    Uploader -->|12s audio| Storage
    Storage --> Player
    Player --> Visualiser
```

This simplified diagram shows the core pieces: an uploader stores a short loop, the Web Audio player retrieves it, and the AWaves visualiser renders motion based on the audio analysis.
