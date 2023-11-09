# express-openapi-memory-usage-response-validation

Small-scale reproduction of memory utilization issues as number of paths
grow when using `express-openapi`, and using response validation middleware.

## Setup

```
npm ci

# Run the server without response validation middleware
npm run without

# Run the server with response validation middleware
npm run with
```

Environment variable `EXPRESS_SERVER_PORT` can be used to control the ports
used when running the server, e.g.

```
EXPRESS_SERVER_PORT=9000 npm run without
EXPRESS_SERVER_PORT=9001 npm run with
```

## Templating

For ease of rapidly generating a sample API, a script has been bundled to permit
easily generating hundreds of similar endpoints, and schema components.

```
npm run generateTemplates
```

Envirionment variables `NUM_COMPONENTS` and `NUM_PATHS` can be used to control
the number of components and paths generated respectively, e.g.

```
NUM_COMPONENTS=1000 NUM_PATHS=300 npm run generateTemplates
```

## Summary of findings

* A higher number of components used leads to overall higher memory utilization at rest
* A higher number of paths used leads to overall higher memory utilization at rest
* Combining a high number of paths with a high number of components leads to massive growths in memory utilization
* Disabling response validation middleware leads to lower memory consumption, massively so when dealing with extreme numbers of paths and components
  - N.B. This also massively affects startup time, with disabling response validation middleware seeing significant reductions in startup time.
* Even if a component is unused, just by existing and being registered, we see growths in memory utilization

## Sample findings

### 100 paths, 100 components

```
[WITHOUT] Memory usage at 1699567280163
┌────────────────────┬───────────┐
│      (index)       │  Values   │
├────────────────────┼───────────┤
│ Resident Set Size  │ 101568512 │
│     Heap Total     │ 20938752  │
│     Heap Used      │ 18127232  │
│ V8 External Memory │  842875   │
└────────────────────┴───────────┘

[WITH] Memory usage at 1699567281105
┌────────────────────┬───────────┐
│      (index)       │  Values   │
├────────────────────┼───────────┤
│ Resident Set Size  │ 182378496 │
│     Heap Total     │ 41648128  │
│     Heap Used      │ 38593664  │
│ V8 External Memory │  842875   │
└────────────────────┴───────────┘
```

(Approx. 2x heap used when using response validation middleware)

### 100 paths, 1000 components

```
[WITHOUT] Memory usage at 1699566248510
┌────────────────────┬──────────┐
│      (index)       │  Values  │
├────────────────────┼──────────┤
│ Resident Set Size  │ 73863168 │
│     Heap Total     │ 24608768 │
│     Heap Used      │ 21487304 │
│ V8 External Memory │  842875  │
└────────────────────┴──────────┘

[WITH] Memory usage at 1699566248906
┌────────────────────┬───────────┐
│      (index)       │  Values   │
├────────────────────┼───────────┤
│ Resident Set Size  │ 306659328 │
│     Heap Total     │ 230129664 │
│     Heap Used      │ 222725808 │
│ V8 External Memory │  842875   │
└────────────────────┴───────────┘
```

(Approx. 10x heap used when using response validation middleware)

### 1000 paths, 100 components

```
[WITHOUT] Memory usage at 1699567446097
┌────────────────────┬──────────┐
│      (index)       │  Values  │
├────────────────────┼──────────┤
│ Resident Set Size  │ 65548288 │
│     Heap Total     │ 21463040 │
│     Heap Used      │ 18703464 │
│ V8 External Memory │  842875  │
└────────────────────┴──────────┘

[WITH] Memory usage at 1699567446977
┌────────────────────┬───────────┐
│      (index)       │  Values   │
├────────────────────┼───────────┤
│ Resident Set Size  │ 151158784 │
│     Heap Total     │ 90144768  │
│     Heap Used      │ 86358528  │
│ V8 External Memory │  842875   │
└────────────────────┴───────────┘
```

(Approx. 5x heap used when using response validation middleware)
