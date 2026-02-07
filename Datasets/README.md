# Dataset Details

## Dataset Title
BBC News Article – Abstractive Summarization Dataset

---

## Usage of Dataset
This dataset is used to train and evaluate transformer-based abstractive summarization models such as **PEGASUS, BART, and T5**.  
It enables comparison of summary quality across different document lengths and supports the implementation of a length-aware model selection strategy.

---

## Dataset Information

**Dataset Name:**  
BBC News Summary Dataset  

**Source:**  
BBC News / Kaggle  

**Domain:**  
News Media (Politics, Business, Sports, Technology, Entertainment)

**Task:**  
Abstractive Text Summarization

**Problem Type:**  
Sequence-to-sequence Natural Language Generation (NLG)

**File Format:**  
CSV / Text files

**Dataset Link:**  
https://www.kaggle.com/datasets/pariza/bbc-news-summary

---

## Dataset Overview

**Total Records:**  
~2,000+ news articles

**Labeled Records:**  
Each article is paired with a human-written reference summary.

**Classes:**  
No classification labels. Data is grouped based on article length (short, medium, long).

**Annotation Type:**  
Human-generated abstractive summaries.

---

## Why This Dataset?
- Provides high-quality human-written summaries.
- Widely used benchmark for evaluating summarization systems.
- Covers multiple news domains, improving generalization.
- Suitable for testing length-control and adaptive model routing.
- Helps measure both semantic accuracy and fluency.

---

## Features Used

**Feature 1:**  
Full news article text (input document)

**Feature 2:**  
Reference summary (target output)

**Feature 3:**  
Article length/token count for stratification

---

## Summary
The BBC News dataset offers a reliable benchmark for abstractive summarization research.  
Its combination of diverse topics, professionally written content, and gold-standard summaries makes it ideal for evaluating transformer-based models and length-sensitive summarization strategies. The dataset supports robust experimentation, fair comparison, and real-world applicability.