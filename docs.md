# Epicon Documentation

> **Machine learning, stripped down.**
> A lightweight, from-scratch ML library built on NumPy with optional Numba acceleration.

---

## Overview

Epicon provides a unified API for neural networks **and** traditional ML models — all with minimal dependencies (NumPy required, Numba optional).

**Design principles:**
- Simple, consistent `fit`/`predict` API across all models
- Minimal dependencies
- Educational transparency — readable, documented source
- Fast execution via vectorized NumPy and optional Numba JIT

---

## Installation

### Minimal install

```bash
pip install numpy
pip install -e .
```

### With Numba acceleration

```bash
pip install numba
pip install -e .
```

### All extras

```bash
pip install -e .[all]
```

**Dependencies:**
- **Required:** NumPy >= 1.21
- **Optional:** Numba >= 0.56 (JIT acceleration)
- **Optional:** pandas (for CSV dataset loading)
- **Optional:** tqdm, tabulate (for training progress and model summaries)

---

## Quickstart

### Traditional ML — Random Forest on Iris

```python
import epicon
from epicon.datasets import load_iris
from epicon.preprocessing import train_test_split
from epicon.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

model = epicon.RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
```

### Neural Network — Sequential API on MNIST

```python
import numpy as np
from epicon import Sequential
from epicon.layers import Dense
from epicon.losses import CategoricalCrossEntropy
from epicon.optimizers import Adam
from epicon.datasets import load_mnist
from epicon.preprocessing import train_test_split

X, y = load_mnist(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = Sequential([
    Dense(784, 128, activation='relu'),
    Dense(128, 64, activation='relu'),
    Dense(64, 10, activation='softmax'),
])
model.compile(loss=CategoricalCrossEntropy(), optimizer=Adam(learning_rate=0.001))
model.fit(X_train, y_train, epochs=5, batch_size=32)
```

---

## Traditional ML Models

All models follow the same `fit(X, y)` / `predict(X)` / `score(X, y)` pattern.

### Linear Models

#### LinearRegression

Ordinary Least Squares linear regression. Supports both closed-form (Normal Equation) and gradient descent.

```python
from epicon import LinearRegression

model = LinearRegression(fit_intercept=True, method='normal_eq')
model.fit(X_train, y_train)
model.predict(X_test)
model.score(X_test, y_test)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fit_intercept` | bool | `True` | Whether to fit an intercept term |
| `method` | str | `"normal_eq"` | Solver: `"normal_eq"` or `"gd"` |
| `learning_rate` | float | `0.01` | Step size for gradient descent |
| `epochs` | int | `1000` | Number of passes for gradient descent |
| `tol` | float | `1e-8` | Convergence tolerance |

**Attributes:** `coef_`, `intercept_`

---

#### Ridge

Linear regression with L2 regularization (Tikhonov). Closed-form solution.

```python
from epicon import Ridge

model = Ridge(alpha=1.0, fit_intercept=True)
model.fit(X_train, y_train)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `alpha` | float | `1.0` | Regularization strength (>= 0) |
| `fit_intercept` | bool | `True` | Whether to fit an intercept |

**Attributes:** `coef_`, `intercept_`

---

#### Lasso

Linear regression with L1 regularization. Uses coordinate descent with soft-thresholding. Can drive coefficients to zero (feature selection).

```python
from epicon import Lasso

model = Lasso(alpha=0.1, fit_intercept=True)
model.fit(X_train, y_train)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `alpha` | float | `1.0` | Regularization strength (>= 0) |
| `fit_intercept` | bool | `True` | Whether to fit an intercept |
| `max_iter` | int | `1000` | Maximum coordinate descent iterations |
| `tol` | float | `1e-4` | Convergence tolerance |

**Attributes:** `coef_`, `intercept_`

---

#### LogisticRegression

Binary logistic regression with sigmoid activation and cross-entropy loss. Supports L1/L2 regularization.

```python
from epicon import LogisticRegression

model = LogisticRegression(penalty='l2', C=1.0)
model.fit(X_train, y_train)
model.predict_proba(X_test)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fit_intercept` | bool | `True` | Whether to fit an intercept |
| `learning_rate` | float | `0.01` | Step size for gradient descent |
| `epochs` | int | `1000` | Number of passes over the data |
| `tol` | float | `1e-8` | Convergence tolerance |
| `C` | float | `1.0` | Inverse regularization strength |
| `penalty` | str or None | `None` | `'l1'`, `'l2'`, or `None` |

**Attributes:** `coef_`, `intercept_`

**Methods:** `predict_proba(X)` returns `(n_samples, 2)` with `[P(y=0), P(y=1)]`.

---

### Tree-Based Models

#### DecisionTreeClassifier

Non-parametric classification tree supporting Gini impurity or entropy.

```python
from epicon import DecisionTreeClassifier

model = DecisionTreeClassifier(criterion='gini', max_depth=5)
model.fit(X_train, y_train)
model.predict_proba(X_test)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `criterion` | str | `'gini'` | `'gini'` or `'entropy'` |
| `max_depth` | int or None | `None` | Maximum tree depth |
| `min_samples_split` | int | `2` | Min samples to split a node |
| `min_samples_leaf` | int | `1` | Min samples at a leaf |
| `max_features` | int or None | `None` | Features to consider per split |
| `random_state` | int or None | `None` | Random seed |

**Attributes:** `classes_`, `n_classes_`, `feature_importances_`, `tree_`

---

#### DecisionTreeRegressor

Regression tree using MSE or MAE as splitting criterion.

```python
from epicon import DecisionTreeRegressor

model = DecisionTreeRegressor(criterion='mse', max_depth=5)
model.fit(X_train, y_train)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `criterion` | str | `'mse'` | `'mse'` or `'mae'` |
| `max_depth` | int or None | `None` | Maximum tree depth |
| `min_samples_split` | int | `2` | Min samples to split a node |
| `min_samples_leaf` | int | `1` | Min samples at a leaf |
| `max_features` | int or None | `None` | Features to consider per split |
| `random_state` | int or None | `None` | Random seed |

**Attributes:** `tree_`, `feature_importances_`

---

### Ensemble Models

#### RandomForestClassifier

Ensemble of decision tree classifiers trained on bootstrap samples.

```python
from epicon import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, max_depth=10)
model.fit(X_train, y_train)
model.predict_proba(X_test)
model.score(X_test, y_test)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `n_estimators` | int | `100` | Number of trees |
| `max_depth` | int or None | `None` | Maximum tree depth |
| `min_samples_split` | int | `2` | Min samples to split a node |
| `min_samples_leaf` | int | `1` | Min samples at a leaf |
| `max_features` | str | `'sqrt'` | `'sqrt'`, `'log2'`, or int |
| `bootstrap` | bool | `True` | Whether to use bootstrap sampling |
| `random_state` | int or None | `None` | Random seed |
| `n_jobs` | int | `1` | Number of parallel jobs |

**Attributes:** `estimators_`, `classes_`, `feature_importances_`

---

#### RandomForestRegressor

Ensemble of decision tree regressors.

```python
from epicon import RandomForestRegressor

model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)
model.score(X_test, y_test)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `n_estimators` | int | `100` | Number of trees |
| `max_depth` | int or None | `None` | Maximum tree depth |
| `min_samples_split` | int | `2` | Min samples to split a node |
| `min_samples_leaf` | int | `1` | Min samples at a leaf |
| `max_features` | str | `'sqrt'` | `'sqrt'`, `'log2'`, or int |
| `bootstrap` | bool | `True` | Whether to use bootstrap sampling |
| `random_state` | int or None | `None` | Random seed |

**Attributes:** `estimators_`, `feature_importances_`

---

### Nearest Neighbors

#### KNeighborsClassifier

Classifier implementing k-nearest neighbors vote.

```python
from epicon import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=5, metric='euclidean', weights='uniform')
model.fit(X_train, y_train)
model.predict_proba(X_test)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `n_neighbors` | int | `5` | Number of neighbors |
| `metric` | str | `'euclidean'` | `'euclidean'` or `'manhattan'` |
| `weights` | str | `'uniform'` | `'uniform'` or `'distance'` |

**Attributes:** `X_train`, `y_train`, `classes_`

---

#### KNeighborsRegressor

Regression based on k-nearest neighbors.

```python
from epicon import KNeighborsRegressor

model = KNeighborsRegressor(n_neighbors=5)
model.fit(X_train, y_train)
model.score(X_test, y_test)
```

**Parameters:** Same as `KNeighborsClassifier`

**Attributes:** `X_train`, `y_train`

---

### Naive Bayes

#### GaussianNB

Gaussian Naive Bayes classifier. Assumes features follow a normal distribution.

```python
from epicon import GaussianNB

model = GaussianNB(var_smoothing=1e-9)
model.fit(X_train, y_train)
model.predict_proba(X_test)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `var_smoothing` | float | `1e-9` | Added to variances for stability |

**Attributes:** `classes_`, `class_prior_`, `theta_` (means), `var_` (variances)

---

## Neural Networks

### Model API

The base `Model` class assembles layers and orchestrates forward/backward passes.

```python
from epicon import Model
from epicon.layers import Dense
from epicon.activations import ReLU, Softmax
from epicon.losses import CategoricalCrossEntropy
from epicon.optimizers import Adam

model = Model(
    Dense(784, 128),
    ReLU(),
    Dense(128, 64),
    ReLU(),
    Dense(64, 10),
    Softmax(),
)
model.set(loss=CategoricalCrossEntropy(), optimizer=Adam(learning_rate=0.001))
model.train(X, y, epochs=10, batch_size=32)
```

**Model methods:**
| Method | Description |
|--------|-------------|
| `set(loss, optimizer)` | Set loss function and optimizer |
| `forward(X)` | Forward pass through all layers |
| `backward(output, y)` | Backward pass to compute gradients |
| `train(X, y, *, epochs, batch_size, validation_split)` | Full training loop |
| `predict(X)` | Forward pass (alias) |
| `summary()` | Print layer-by-layer summary with parameter counts |
| `evaluate(X_test, y_test)` | Compute loss, accuracy, precision on train and test |
| `save_model(file_path)` | Serialize model to JSON |
| `load_model(file_path)` | Static method — deserialize model from JSON |

**`train()` parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `epochs` | int | `1` | Number of training epochs |
| `batch_size` | int or None | `None` | Mini-batch size (None = full batch) |
| `validation_split` | float | `0.0` | Fraction used for validation |

Training uses gradient clipping (default clip value: 1.0) and optional shuffling.

---

### Sequential API (Keras-style)

`Sequential` extends `Model` with a simplified Keras-like interface. Activations can be specified as strings directly on `Dense` layers.

```python
from epicon import Sequential
from epicon.layers import Dense
from epicon.losses import CategoricalCrossEntropy
from epicon.optimizers import Adam

model = Sequential([
    Dense(784, 128, activation='relu'),
    Dense(128, 64, activation='relu'),
    Dense(64, 10, activation='softmax'),
])
model.compile(loss=CategoricalCrossEntropy(), optimizer=Adam())
model.fit(X_train, y_train, epochs=10, batch_size=32, shuffle=True, validation_split=0.1)
```

**String activations supported:** `'relu'`, `'sigmoid'`, `'softmax'`, `'tanh'`, `'leaky_relu'` / `'leakyrelu'`

**Methods:**
| Method | Description |
|--------|-------------|
| `add(layer)` | Add a layer (or list of layers) after construction |
| `compile(loss, optimizer)` | Configure model for training (alias for `set()`) |
| `fit(X, y, epochs, batch_size, shuffle, validation_split)` | Train the model |

---

### Layers

#### Dense

Fully connected layer with He-initialized weights.

```python
from epicon.layers import Dense

layer = Dense(n_inputs=784, n_neurons=128, activation='relu')
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `n_inputs` | int | `1` | Number of input features |
| `n_neurons` | int | `1` | Number of output neurons |
| `activation` | str or None | `None` | String activation (Sequential only) |

**Attributes:** `weights`, `biases`, `dweights`, `dbiases`, `trainable` (True)

---

#### Dropout

Inverted dropout regularization layer.

```python
from epicon.layers import Dropout

layer = Dropout(p=0.5)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `p` | float | `0.5` | Dropout probability (0 to <1) |

During training, scales surviving units by `1/(1-p)`. At inference, passes input through unchanged.

---

#### Conv1D

1D convolutional layer with Xavier initialization.

```python
from epicon.layers import Conv1D

layer = Conv1D(in_channels=3, out_channels=16, kernel_size=3, stride=1, padding=0)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `in_channels` | int | — | Number of input channels |
| `out_channels` | int | — | Number of output channels (filters) |
| `kernel_size` | int | — | Size of the convolution kernel |
| `stride` | int | `1` | Convolution stride |
| `padding` | int | `0` | Zero-padding on both sides |

**Input shape:** `(batch, in_channels, width)`
**Output shape:** `(batch, out_channels, out_width)`

---

### Activations

All activations subclass `Activation` (which subclasses `Layer`).

| Class | Formula | Description |
|-------|---------|-------------|
| `ReLU()` | `max(0, x)` | Rectified Linear Unit |
| `LeakyReLU(alpha=0.01)` | `x if x>0 else alpha*x` | Leaky ReLU |
| `Sigmoid()` | `1 / (1 + e^{-x})` | Maps to (0, 1) |
| `Softmax()` | `e^{x_i} / sum(e^{x})` | Probability distribution |
| `Tanh()` | `tanh(x)` | Maps to (-1, 1) |

---

### Losses

All losses subclass `Loss`.

| Class | Formula | Use Case |
|-------|---------|----------|
| `MSE()` | `mean((y_pred - y_true)^2)` | Regression |
| `BinaryCrossEntropy()` | `-mean(y*log(p) + (1-y)*log(1-p))` | Binary classification |
| `CategoricalCrossEntropy()` | `-sum(y_true * log(y_pred))` | Multi-class classification |

**BinaryCrossEntropy** has an adjustable threshold:
```python
loss = BinaryCrossEntropy()
loss.set_threshold(0.3)
```

---

### Optimizers

All optimizers subclass `Optimizer`.

| Class | Description |
|-------|-------------|
| `GradientDescent(learning_rate=0.1, decay=0)` | Standard SGD |
| `Momentum(learning_rate=0.1, decay=0, momentum=0)` | SGD with Polyak momentum |
| `Adam(learning_rate=0.001, decay=0, beta1=0.9, beta2=0.999, epsilon=1e-7)` | Adaptive Moment Estimation |

All optimizers support learning rate decay:
```python
optimizer = Adam(learning_rate=0.01, decay=1e-3)
```

---

### Model Persistence

Save and load models as JSON:

```python
# Save
model.save_model(file_path='my_model.json')

# Load
from epicon import Model
loaded = Model.load_model('my_model.json')
```

The saved JSON includes all layer types, weights, biases, optimizer config, and model metadata.

---

## Preprocessing

### StandardScaler

Standardize features by removing mean and scaling to unit variance.

```python
from epicon.preprocessing import StandardScaler

scaler = StandardScaler(with_mean=True, with_std=True)
X_scaled = scaler.fit_transform(X)
X_original = scaler.inverse_transform(X_scaled)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `with_mean` | bool | `True` | Center the data |
| `with_std` | bool | `True` | Scale to unit variance |

**Attributes:** `mean_`, `std_`, `n_features_in_`

---

### MinMaxScaler

Scale features to a given range, typically [0, 1].

```python
from epicon.preprocessing import MinMaxScaler

scaler = MinMaxScaler(feature_range=(0, 1))
X_scaled = scaler.fit_transform(X)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `feature_range` | tuple | `(0, 1)` | Desired range |

**Attributes:** `min_`, `scale_`, `data_min_`, `data_max_`

---

### LabelEncoder

Encode target labels as integers 0 to n_classes-1.

```python
from epicon.preprocessing import LabelEncoder

encoder = LabelEncoder()
y_enc = encoder.fit_transform(['cat', 'dog', 'bird'])
y_original = encoder.inverse_transform([0, 1, 2])
```

**Attributes:** `classes_`

---

### OneHotEncoder

Encode categorical features as one-hot arrays.

```python
from epicon.preprocessing import OneHotEncoder

encoder = OneHotEncoder()
X_ohe = encoder.fit_transform([['cat'], ['dog'], ['bird']])
```

**Attributes:** `categories_`

---

### train_test_split

Split arrays into random train and test subsets.

```python
from epicon.preprocessing import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `test_size` | float or int | `0.2` | Proportion (float) or absolute count (int) |
| `random_state` | int or None | `None` | Random seed |

**Returns:** `(X_train, X_test, y_train, y_test)`

---

## Datasets

### Loaders

#### load_iris

Load the Iris flower dataset (150 samples, 4 features, 3 classes).

```python
from epicon.datasets import load_iris

X, y = load_iris(return_X_y=True)
# Or as a Bunch object:
data = load_iris()
print(data.feature_names)
print(data.target_names)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `return_X_y` | bool | `False` | If True, returns `(X, y)` tuple |

---

#### load_mnist

Load the MNIST handwritten digits dataset (784 features, 10 classes).

```python
from epicon.datasets import load_mnist

X, y = load_mnist(return_X_y=True)
# X is normalized by 255.0
```

### Generators

#### make_classification

Generate a random n-class classification dataset.

```python
from epicon.datasets import make_classification

X, y = make_classification(n_samples=100, n_features=10, n_classes=2, n_informative=5, random_state=42)
```

---

#### make_regression

Generate a random regression dataset.

```python
from epicon.datasets import make_regression

X, y = make_regression(n_samples=100, n_features=10, noise=0.1, random_state=42)
```

---

## Metrics

### Classification

```python
from epicon.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
```

| Function | Description |
|----------|-------------|
| `accuracy_score(y_true, y_pred)` | Fraction of correct predictions |
| `confusion_matrix(y_true, y_pred, labels=None)` | Confusion matrix `(n_classes, n_classes)` |
| `precision_score(y_true, y_pred, average='binary', pos_label=1)` | Precision with `'binary'`, `'macro'`, `'micro'`, `'weighted'` averaging |
| `recall_score(y_true, y_pred, average='binary', pos_label=1)` | Recall with same averaging options |
| `f1_score(y_true, y_pred, average='binary', pos_label=1)` | Harmonic mean of precision and recall |

### Regression

```python
from epicon.metrics import mean_squared_error, mean_absolute_error, r2_score
```

| Function | Description |
|----------|-------------|
| `mean_squared_error(y_true, y_pred)` | MSE |
| `mean_absolute_error(y_true, y_pred)` | MAE |
| `r2_score(y_true, y_pred)` | Coefficient of determination (R^2) |

---

## Advanced: Custom Model with ModelBuilder

Build models from configuration dictionaries:

```python
from epicon.utils import ModelBuilder

config = [
    {"type": "Dense", "n_inputs": 784, "n_neurons": 128},
    {"type": "ReLU"},
    {"type": "Dense", "n_inputs": 128, "n_neurons": 10},
    {"type": "Softmax"},
]

builder = ModelBuilder()
model = builder.build(config)
```

---

## Numba Acceleration

Epicon automatically accelerates key operations when Numba is installed:
- Tree split finding (`_best_split_numeric`)
- Impurity calculations (`_gini_impurity`, `_entropy_impurity`, `_mse_split`)
- Distance computations (`_euclidean_distance`, `_manhattan_distance`)
- KNN prediction (`_knn_predict_single`)

No code changes needed — acceleration is automatic when Numba is available.

---

## API Reference (Quick Index)

### Top-level (`epicon.*`)
`Model`, `Sequential`, `Dense`, `Dropout`, `Conv1D`, `Layer`, `ReLU`, `LeakyReLU`, `Sigmoid`, `Softmax`, `Tanh`, `Activation`, `MSE`, `BinaryCrossEntropy`, `CategoricalCrossEntropy`, `Loss`, `GradientDescent`, `Momentum`, `Adam`, `Optimizer`, `LinearRegression`, `LogisticRegression`, `Ridge`, `Lasso`, `KNeighborsClassifier`, `KNeighborsRegressor`, `GaussianNB`, `DecisionTreeClassifier`, `DecisionTreeRegressor`, `RandomForestClassifier`, `RandomForestRegressor`, `StandardScaler`, `MinMaxScaler`, `LabelEncoder`, `OneHotEncoder`, `train_test_split`, `load_iris`, `load_mnist`, `make_classification`, `make_regression`, `accuracy_score`, `precision_score`, `recall_score`, `f1_score`, `confusion_matrix`, `mean_squared_error`, `mean_absolute_error`, `r2_score`

### Submodules
| Module | Contents |
|--------|----------|
| `epicon.layers` | `Dense`, `Dropout`, `Conv1D`, `Layer` |
| `epicon.activations` | `ReLU`, `LeakyReLU`, `Sigmoid`, `Softmax`, `Tanh`, `Activation` |
| `epicon.losses` | `MSE`, `BinaryCrossEntropy`, `CategoricalCrossEntropy`, `Loss` |
| `epicon.optimizers` | `GradientDescent`, `Momentum`, `Adam`, `Optimizer` |
| `epicon.models` | `Model`, `Sequential` |
| `epicon.linear_model` | `LinearRegression`, `LogisticRegression`, `Ridge`, `Lasso` |
| `epicon.tree` | `DecisionTreeClassifier`, `DecisionTreeRegressor` |
| `epicon.ensemble` | `RandomForestClassifier`, `RandomForestRegressor` |
| `epicon.neighbors` | `KNeighborsClassifier`, `KNeighborsRegressor` |
| `epicon.naive_bayes` | `GaussianNB` |
| `epicon.preprocessing` | `StandardScaler`, `MinMaxScaler`, `LabelEncoder`, `OneHotEncoder`, `train_test_split` |
| `epicon.datasets` | `load_iris`, `load_mnist`, `make_classification`, `make_regression` |
| `epicon.metrics` | `accuracy_score`, `precision_score`, `recall_score`, `f1_score`, `confusion_matrix`, `mean_squared_error`, `mean_absolute_error`, `r2_score` |
| `epicon.utils` | `LAYER_REGISTERY`, `ModelBuilder` |
