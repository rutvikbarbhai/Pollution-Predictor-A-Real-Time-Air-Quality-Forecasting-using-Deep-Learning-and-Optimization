import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_curve, auc
from sklearn.preprocessing import StandardScaler

# Load your dataset
df = pd.read_csv("11_values.csv")

# Define thresholds for classification
thresholds = {
    'PM2.5': 100,
    'PM10': 150,
    'AQI': 200
}

# Prepare your features (exclude target columns)
feature_columns = df.columns.difference(['PM2.5', 'PM10', 'AQI'])

# Normalize features (optional but recommended)
scaler = StandardScaler()
df[feature_columns] = scaler.fit_transform(df[feature_columns])

# Models to compare
models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Random Forest": RandomForestClassifier()
}

# Setup the plots
fig, axes = plt.subplots(1, 3, figsize=(20, 6))

for i, (target, threshold) in enumerate(thresholds.items()):
    # Binary classification: 1 = High, 0 = Low
    df[f'High_{target}'] = (df[target] > threshold).astype(int)

    # Define X and y
    X = df[feature_columns]
    y = df[f'High_{target}']

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Plot for each model
    ax = axes[i]
    for name, model in models.items():
        model.fit(X_train, y_train)
        probs = model.predict_proba(X_test)[:, 1]
        fpr, tpr, _ = roc_curve(y_test, probs)
        roc_auc = auc(fpr, tpr)
        ax.plot(fpr, tpr, label=f"{name} (AUC = {roc_auc:.2f})")

    ax.plot([0, 1], [0, 1], 'k--', label='Random Classifier')
    ax.set_title(f'ROC Curve: High {target}')
    ax.set_xlabel('False Positive Rate')
    ax.set_ylabel('True Positive Rate')
    ax.legend(loc='lower right')
    ax.grid(True)

plt.tight_layout()
plt.show()
