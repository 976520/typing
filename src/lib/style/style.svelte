<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: "Consolas", sans-serif;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    padding: 20px;
    animation: fadeIn 1s ease-in-out;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    width: 50%;
    color: #333;
    text-align: center;
    animation: slideIn 1s ease-in-out;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #333;
    animation: fadeIn 1s ease-in-out;
  }

  textarea {
    width: 60%;
    height: 100px;
    font-size: 1.25rem;
    padding: 30px;
    margin-bottom: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    resize: none;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #333;
    backdrop-filter: blur(10px);
    outline: none;
    animation: fadeIn 1s ease-in-out;
    font-family: "Consolas", sans-serif;
  }

  .metrics {
    display: flex;
    justify-content: space-around;
    width: 60%;
    margin-bottom: 1rem;
    color: #333;
    animation: fadeIn 1s ease-in-out;
  }

  .metrics p {
    margin: 0;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    background-color: rgba(0, 123, 255, 0.1);
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    backdrop-filter: blur(10px);
    animation: fadeIn 1s ease-in-out;
  }

  button:hover {
    background-color: rgba(0, 86, 179, 0.1);
  }

  .colored-text {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    color: #333;
    animation: fadeIn 1s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
