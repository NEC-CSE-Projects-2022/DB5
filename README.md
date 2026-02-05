# Team DB5 – Length-Sensitive Summarization: A Stratified Approach to Abstractive Text Generation

## Team Info
- **22471A05N9 — Shaik Faheem Ahmed**  
  ([LinkedIn](https://www.linkedin.com/in/faheem-ahmed-shaik-b544b5366))  
  _Work Done: Model implementation, training pipeline, integration_

- **23475A0521 — Ravula Nandu**  
  ([LinkedIn](https://www.linkedin.com/in/nandu-r-a05336383))  
  _Work Done: Dataset preparation, preprocessing, exploratory analysis_

- **23475A0506 — Kota David Shalem**  
  ([LinkedIn](https://www.linkedin.com/in/david-kota-008488188))  
  _Work Done: Evaluation, result analysis, documentation_

---

## Abstract
In the era of information explosion, generating concise and human-like summaries from long-form text has become essential. Traditional extractive techniques often fail to maintain narrative coherence and semantic depth, motivating the need for stronger abstractive approaches. This project presents a dynamic multi-model summarization pipeline that selects the most suitable transformer model—PEGASUS, BART, or T5—based on input characteristics to enable scalable and context-aware text abstraction. The system is trained and evaluated on the BBC News dataset using ROUGE and BERTScore metrics. Experimental results show that the pipeline consistently produces coherent, fluent, and semantically rich summaries across varied article lengths. Overall, this study demonstrates a practical and deployment-ready framework for modern abstractive summarization while highlighting future opportunities in hybrid, efficient, and multilingual summarization systems.

---

## Paper Reference (Inspiration)
👉 **[Length-Sensitive Summarization: A Stratified Approach to Abstractive Text Generation  
– IEEE Research Paper](https://ieeexplore.ieee.org/document/10838534)**  
This IEEE research paper served as the primary inspiration for the proposed summarization framework.

---

## Our Improvement Over Existing Paper
- Implemented a simplified academic-friendly version of the stratified summarization pipeline  
- Modular integration of BART, PEGASUS, and T5 models for reproducibility  
- Improved preprocessing and routing logic for stable experimentation  
- Clear comparative evaluation using ROUGE and BERTScore metrics  
- Designed with deployment-readiness and extensibility in mind  

---

## About the Project
- **What the project does:**  
  Generates abstractive summaries of text documents using length-aware transformer models.

- **Why it is useful:**  
  Helps users quickly understand large documents such as news articles and reports.

- **Project Workflow:**  
  Text input → preprocessing → length-based model selection → transformer summarization → evaluation

---

## Dataset Used
👉 **[BBC News Summary Dataset](https://www.kaggle.com/datasets/pariza/bbc-news-summary)**

**Dataset Details:**
- Collection of BBC news articles paired with human-written summaries  
- Covers multiple domains including politics, sports, business, and technology  
- Articles categorized into short, medium, and long lengths  
- Used for training, validation, and testing of summarization models  

---

## Dependencies Used
- Python  
- NumPy  
- Pandas  
- PyTorch  
- Hugging Face Transformers  
- NLTK  
- ROUGE Score Library  
- Matplotlib  

---

## EDA & Preprocessing
- Removal of HTML tags, special characters, URLs, and extra whitespace  
- Lowercasing and text normalization  
- Tokenization using model-specific tokenizers (BART, PEGASUS, T5)  
- Length-based stratification of articles  
- Train, validation, and test split  

---

## Model Training Info
- Framework: PyTorch  
- Models Used: BART, PEGASUS, T5  
- Optimizer: AdamW  
- Learning Rate: 2e-5 to 3e-4 (model-specific)  
- Epochs: 4–10 with early stopping  
- Batch Size: Hardware-dependent (with gradient accumulation)  
- Loss Function: Cross-entropy loss  

---

## Model Testing / Evaluation
The system is evaluated using:
- ROUGE-1  
- ROUGE-2  
- ROUGE-L  
- BERTScore  

Evaluation is performed across short, medium, and long article categories.

---

## Results
- PEGASUS achieved the highest ROUGE and BERTScore values  
- BART produced context-rich and fluent summaries  
- T5 demonstrated stable semantic performance on shorter texts  

Overall, the stratified approach improved summary quality and length control.

---

## Limitations & Future Work
**Limitations:**
- High computational cost for long documents  
- Limited to English news datasets  

**Future Work:**
- Multilingual summarization support  
- Lightweight and edge-friendly model optimization  
- Domain-specific fine-tuning (medical, legal, educational)  

---

## Deployment Info
- Implemented as an offline research prototype  
- Can be deployed using Flask or FastAPI  
- Suitable for integration into content summarization platforms  
- Extendable for real-time applications  

---
