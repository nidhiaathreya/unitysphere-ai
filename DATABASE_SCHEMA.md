# UnitySphere AI — Firestore Database Schema

## Collections

### `users`
| Field | Type | Description |
|-------|------|-------------|
| uid | string | Firebase Auth UID |
| email | string | User email |
| displayName | string | Display name |
| role | string | ngo, startup, volunteer, university, government, company, admin |
| organizationId | string? | Linked organization |
| photoURL | string? | Avatar URL |
| createdAt | timestamp | |
| updatedAt | timestamp | |

### `organizations`
| Field | Type | Description |
|-------|------|-------------|
| userId | string | Owner UID |
| name | string | Organization name |
| role | string | Organization type |
| logo | string? | Logo URL |
| mission | string | Mission statement |
| categories | array | Challenge category IDs |
| location | map | { country, city, lat, lng } |
| projects | array | Embedded project summaries |
| resourcesNeeded | array | string[] |
| resourcesAvailable | array | string[] |
| sdgGoals | array | number[] (1-17) |
| impactMetrics | map | livesImpacted, carbonReduced, etc. |
| verified | boolean | Admin verification |
| collaborationStatus | string | open, busy, emergency |
| embedding | array | number[] for AI matching |
| createdAt | timestamp | |
| updatedAt | timestamp | |

### `projects`
| Field | Type | Description |
|-------|------|-------------|
| organizationId | string | Parent org |
| title | string | |
| description | string | |
| category | string | Challenge category |
| status | string | active, completed, planning |
| fundingRequired | number? | |
| impactScore | number? | |

### `chatRooms` / `chatRooms/{id}/messages`
| Field | Type | Description |
|-------|------|-------------|
| name | string | Room name |
| type | string | public, group, emergency |
| members | array | UID[] |
| messages.userId | string | |
| messages.content | string | |
| messages.type | string | text, system, ai-summary |
| messages.timestamp | timestamp | |

### `crisisAlerts`
| Field | Type | Description |
|-------|------|-------------|
| type | string | flood, earthquake, etc. |
| severity | string | low, medium, high, critical |
| region | string | |
| country | string | |
| lat, lng | number | |
| description | string | |
| actionPlan | string? | AI-generated |
| organizationsNotified | number | |
| detectedAt | timestamp | |

### `collaborations`
| Field | Type | Description |
|-------|------|-------------|
| orgAId | string | |
| orgBId | string | |
| score | number | Compatibility % |
| status | string | pending, active, completed |
| predictedSuccess | number | |

### `donations`
| Field | Type | Description |
|-------|------|-------------|
| fromOrgId | string? | |
| toOrgId | string | |
| amount | number | |
| txHash | string? | Blockchain reference |
| verified | boolean | |
| impactNote | string | |

### `leaderboard`
| Field | Type | Description |
|-------|------|-------------|
| organizationId | string | |
| impactScore | number | |
| collaborationScore | number | |
| badges | array | string[] |
| rank | number | |

## Indexes (recommended)
- `organizations` → categories (array-contains), verified
- `crisisAlerts` → severity, detectedAt (desc)
- `collaborations` → orgAId, status
