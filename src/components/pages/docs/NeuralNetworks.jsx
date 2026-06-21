import { useEffect } from 'react'
import { useDocs } from '../../layout/DocsLayout'
import CodeSnippet from '../../CodeSnippet'
import PropsTable from '../../PropsTable'
import SEO from '../../SEO'

export default function NeuralNetworks() {
  const { setToc } = useDocs()

  useEffect(() => {
    setToc([
      { id: 'model-api', label: 'Model API', children: [
        { id: 'model-usage', label: 'Usage' },
        { id: 'model-methods', label: 'Methods' },
        { id: 'train-parameters', label: 'Train Parameters' },
      ]},
      { id: 'sequential-api', label: 'Sequential API', children: [
        { id: 'sequential-usage', label: 'Usage' },
      ]},
      { id: 'layers', label: 'Layers', children: [
        { id: 'dense', label: 'Dense' },
        { id: 'dropout', label: 'Dropout' },
        { id: 'conv1d', label: 'Conv1D' },
      ]},
      { id: 'activations', label: 'Activations' },
      { id: 'losses', label: 'Losses' },
      { id: 'optimizers', label: 'Optimizers' },
      { id: 'model-persistence', label: 'Model Persistence' },
    ])
    return () => setToc([])
  }, [setToc])

  return (
    <div className="text-white">
      <SEO
        title="Neural Networks"
        description="Build and train neural networks with Epicon's Sequential API. Dense, Dropout, Conv1D layers with ReLU, Softmax, Adam optimizer, and model persistence."
        canonicalUrl="https://epiconml.github.io/docs/neural-networks"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "Epicon Neural Networks",
          "description": "Complete guide to building and training neural networks with Epicon.",
        }}
      />
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Neural Networks</h1>
      <p className="text-white/60 mb-10 max-w-3xl">
        Epicon provides two APIs for building neural networks: the flexible <code className="text-white/80 bg-white/5 px-1 rounded-xs text-sm font-mono">Model</code> base class and the Keras-style <code className="text-white/80 bg-white/5 px-1 rounded-xs text-sm font-mono">Sequential</code> API.
      </p>

      <section id="model-api" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Model API</h2>
        <p className="text-sm text-white/60 mb-3">The base <code className="text-white/80 font-mono">Model</code> class assembles layers and orchestrates forward/backward passes.</p>

        <h3 id="model-usage" className="text-lg font-semibold mb-3 mt-8 text-white/80">Usage</h3>
        <CodeSnippet code={`from epicon import Model
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
model.train(X, y, epochs=10, batch_size=32)`} />

        <h3 id="model-methods" className="text-lg font-semibold mb-3 mt-8 text-white/80">Methods</h3>
        <PropsTable columns={['Method', 'Description']} rows={[
          ['set(loss, optimizer)', 'Set loss function and optimizer'],
          ['forward(X)', 'Forward pass through all layers'],
          ['backward(output, y)', 'Backward pass to compute gradients'],
          ['train(X, y, *, epochs, batch_size, validation_split)', 'Full training loop'],
          ['predict(X)', 'Forward pass (alias)'],
          ['summary()', 'Print layer-by-layer summary with parameter counts'],
          ['evaluate(X_test, y_test)', 'Compute loss, accuracy, precision on train and test'],
          ['save_model(file_path)', 'Serialize model to JSON'],
          ['load_model(file_path)', 'Static method -- deserialize model from JSON'],
        ]} />

        <h3 id="train-parameters" className="text-lg font-semibold mb-3 mt-8 text-white/80">Train Parameters</h3>
        <PropsTable rows={[
          ['epochs', 'int', '1', 'Number of training epochs'],
          ['batch_size', 'int | None', 'None', 'Mini-batch size (None = full batch)'],
          ['validation_split', 'float', '0.0', 'Fraction used for validation'],
        ]} />
        <p className="text-xs text-white/60 mb-6">Training uses gradient clipping (default clip value: 1.0) and optional shuffling.</p>
      </section>

      <section id="sequential-api" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Sequential API</h2>
        <p className="text-sm text-white/60 mb-3">
          <code className="text-white/80 font-mono">Sequential</code> extends <code className="text-white/80 font-mono">Model</code> with a simplified Keras-like interface. Activations can be specified as strings directly on <code className="text-white/80 font-mono">Dense</code> layers.
        </p>

        <h3 id="sequential-usage" className="text-lg font-semibold mb-3 mt-8 text-white/80">Usage</h3>
        <CodeSnippet code={`from epicon import Sequential
from epicon.layers import Dense
from epicon.losses import CategoricalCrossEntropy
from epicon.optimizers import Adam

model = Sequential([
    Dense(784, 128, activation='relu'),
    Dense(128, 64, activation='relu'),
    Dense(64, 10, activation='softmax'),
])
model.compile(loss=CategoricalCrossEntropy(), optimizer=Adam())
model.fit(X_train, y_train, epochs=10, batch_size=32, shuffle=True, validation_split=0.1)`} />
        <p className="text-sm text-white/60 mb-4">
          Supported string activations: <code className="text-white/80 font-mono text-xs">'relu'</code>, <code className="text-white/80 font-mono text-xs">'sigmoid'</code>, <code className="text-white/80 font-mono text-xs">'softmax'</code>, <code className="text-white/80 font-mono text-xs">'tanh'</code>, <code className="text-white/80 font-mono text-xs">'leaky_relu'</code> / <code className="text-white/80 font-mono text-xs">'leakyrelu'</code>
        </p>
        <PropsTable columns={['Method', 'Description']} rows={[
          ['add(layer)', 'Add a layer (or list of layers) after construction'],
          ['compile(loss, optimizer)', 'Configure model for training (alias for set())'],
          ['fit(X, y, epochs, batch_size, shuffle, validation_split)', 'Train the model'],
        ]} />
      </section>

      <section id="layers" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Layers</h2>

        <h3 id="dense" className="text-lg font-semibold mb-3 mt-8 text-white/80">Dense</h3>
        <p className="text-sm text-white/60 mb-3">Fully connected layer with He-initialized weights.</p>
        <CodeSnippet code={`from epicon.layers import Dense

layer = Dense(n_inputs=784, n_neurons=128, activation='relu')`} />
        <PropsTable rows={[
          ['n_inputs', 'int', '1', 'Number of input features'],
          ['n_neurons', 'int', '1', 'Number of output neurons'],
          ['activation', 'str | None', 'None', 'String activation (Sequential only)'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">weights</code>, <code className="font-mono">biases</code>, <code className="font-mono">dweights</code>, <code className="font-mono">dbiases</code>, <code className="font-mono">trainable</code> (True)</p>

        <h3 id="dropout" className="text-lg font-semibold mb-3 mt-8 text-white/80">Dropout</h3>
        <p className="text-sm text-white/60 mb-3">Inverted dropout regularization layer. During training, scales surviving units by <code className="text-white/80 font-mono text-xs">1/(1-p)</code>. At inference, passes input through unchanged.</p>
        <CodeSnippet code={`from epicon.layers import Dropout

layer = Dropout(p=0.5)`} />
        <PropsTable rows={[
          ['p', 'float', '0.5', 'Dropout probability (0 to < 1)'],
        ]} />

        <h3 id="conv1d" className="text-lg font-semibold mb-3 mt-8 text-white/80">Conv1D</h3>
        <p className="text-sm text-white/60 mb-3">1D convolutional layer with Xavier initialization.</p>
        <CodeSnippet code={`from epicon.layers import Conv1D

layer = Conv1D(in_channels=3, out_channels=16, kernel_size=3, stride=1, padding=0)`} />
        <PropsTable rows={[
          ['in_channels', 'int', '--', 'Number of input channels'],
          ['out_channels', 'int', '--', 'Number of output channels (filters)'],
          ['kernel_size', 'int', '--', 'Size of the convolution kernel'],
          ['stride', 'int', '1', 'Convolution stride'],
          ['padding', 'int', '0', 'Zero-padding on both sides'],
        ]} />
        <p className="text-xs text-white/60 mb-6">
          Input shape: <code className="font-mono text-white/80">(batch, in_channels, width)</code>
          &nbsp;&middot;&nbsp;
          Output shape: <code className="font-mono text-white/80">(batch, out_channels, out_width)</code>
        </p>
      </section>

      <section id="activations" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Activations</h2>
        <p className="text-sm text-white/60 mb-4">All activations subclass <code className="text-white/80 font-mono text-xs">Activation</code> (which subclasses <code className="text-white/80 font-mono text-xs">Layer</code>).</p>
        <PropsTable columns={['Class', 'Formula', 'Description']} rows={[
          ['ReLU()', 'max(0, x)', 'Rectified Linear Unit'],
          ['LeakyReLU(alpha=0.01)', 'x if x>0 else alpha*x', 'Leaky ReLU'],
          ['Sigmoid()', '1 / (1 + e\u207b\u02e3)', 'Maps to (0, 1)'],
          ['Softmax()', 'e\u02e3 / \u03a3(e\u02e3)', 'Probability distribution'],
          ['Tanh()', 'tanh(x)', 'Maps to (-1, 1)'],
        ]} />
      </section>

      <section id="losses" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Losses</h2>
        <p className="text-sm text-white/60 mb-4">All losses subclass <code className="text-white/80 font-mono text-xs">Loss</code>.</p>
        <PropsTable columns={['Class', 'Formula', 'Use Case']} rows={[
          ['MSE()', 'mean((y_pred - y_true)\u00b2)', 'Regression'],
          ['BinaryCrossEntropy()', '-mean(y*log(p) + (1-y)*log(1-p))', 'Binary classification'],
          ['CategoricalCrossEntropy()', '-\u03a3(y_true * log(y_pred))', 'Multi-class classification'],
        ]} />
        <p className="text-xs text-white/60">
          <code className="text-white/80 font-mono text-xs">BinaryCrossEntropy</code> has an adjustable threshold:
          <code className="block mt-1 text-white/60 font-mono text-xs ml-4">loss = BinaryCrossEntropy()</code>
          <code className="text-white/60 font-mono text-xs ml-4">loss.set_threshold(0.3)</code>
        </p>
      </section>

      <section id="optimizers" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Optimizers</h2>
        <p className="text-sm text-white/60 mb-4">All optimizers subclass <code className="text-white/80 font-mono text-xs">Optimizer</code> and support learning rate decay.</p>
        <PropsTable columns={['Class', 'Description']} rows={[
          ['GradientDescent(learning_rate=0.1, decay=0)', 'Standard SGD'],
          ['Momentum(learning_rate=0.1, decay=0, momentum=0)', 'SGD with Polyak momentum'],
          ['Adam(learning_rate=0.001, decay=0, beta1=0.9, beta2=0.999, epsilon=1e-7)', 'Adaptive Moment Estimation'],
        ]} />
        <p className="text-xs text-white/60">
          Learning rate decay example:
          <code className="block mt-1 text-white/60 font-mono text-xs ml-4">optimizer = Adam(learning_rate=0.01, decay=1e-3)</code>
        </p>
      </section>

      <section id="model-persistence" className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Model Persistence</h2>
        <p className="text-sm text-white/60 mb-3">Save and load models as JSON. The saved file includes all layer types, weights, biases, optimizer config, and model metadata.</p>
        <CodeSnippet code={`# Save
model.save_model(file_path='my_model.json')

# Load
from epicon import Model
loaded = Model.load_model('my_model.json')`} />
      </section>
    </div>
  )
}
