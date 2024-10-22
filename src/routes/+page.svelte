<script>
    import { nav } from '$app/navigation';
    
    function navigateToShort() {
        nav('/short');
    }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Consolas', sans-serif;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    padding: 20px;
    animation: fadeIn 1s ease-in-out;
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
</style>

<main>
  <button on:click={navigateToShort}>
    짧은글연습
  </button>
</main>
