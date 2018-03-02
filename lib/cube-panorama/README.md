# panorama_cube

**立方体包含6面(px面，nx面，py面，ny面，pz面，nz面)，每个面可以根据实际情况划分成`m*n`个块.**


每个面的根据`m*n`进行划分，可以划分成`m*n`个小面，划分之后的每个小面的命名格式如下：

### px面：(positive yz plane）

|  | 0 | 1 | ... | m |
| --- | --- | --- | --- | --- |
| 0 | px_00 | px_01 | px_0... | px_0m |
| 1 | px_10 | px_11 | px_1... | px_1m |
| ... | px_...0 | px_...1 | px_... | px_...m |
| n | px_n0 | px_n1 | px_n... | px_nm |

### nx面：(negtive yz plane）

|  | 0 | 1 | ... | m |
| --- | --- | --- | --- | --- |
| 0 | nx_00 | nx_01 | nx_0... | nx_0m |
| 1 | nx_10 | nx_11 | nx_1... | nx_1m |
| ... | nx_...0 | nx_...1 | nx_... | nx_...m |
| n | nx_n0 | nx_n1 | nx_n... | nx_nm |

### py面：(positive xz plane）

|  | 0 | 1 | ... | m |
| --- | --- | --- | --- | --- |
| 0 | py_00 | py_01 | py_0... | py_0m |
| 1 | py_10 | py_11 | py_1... | py_1m |
| ... | py_...0 | py_...1 | py_... | py_...m |
| n | py_n0 | py_n1 | py_n... | py_nm |

### ny面：(negtive xz plane）

|  | 0 | 1 | ... | m |
| --- | --- | --- | --- | --- |
| 0 | ny_00 | ny_01 | ny_0... | ny_0m |
| 1 | ny_10 | ny_11 | ny_1... | ny_1m |
| ... | ny_...0 | ny_...1 | ny_... | ny_...m |
| n | ny_n0 | ny_n1 | ny_n... | ny_nm |
| n | nx_n0 | nx_n1 | nx_n... | nx_nm |

### pz面：(positive xy plane）

|  | 0 | 1 | ... | m |
| --- | --- | --- | --- | --- |
| 0 | pz_00 | pz_01 | pz_0... | pz_0m |
| 1 | pz_10 | pz_11 | pz_1... | pz_1m |
| ... | pz_...0 | pz_...1 | pz_... | pz_...m |
| n | pz_n0 | pz_n1 | pz_n... | pz_nm |

### nz面：(negtive xy plane）

|  | 0 | 1 | ... | m |
| --- | --- | --- | --- | --- |
| 0 | nz_00 | nz_01 | nz_0... | nz_0m |
| 1 | nz_10 | nz_11 | nz_1... | nz_1m |
| ... | nz_...0 | nz_...1 | nz_... | nz_...m |
| n | nz_n0 | nz_n1 | nz_n... | nz_nm |