<template>
  <form>
    <div>
      <label for="email">Your Email</label>
      <input type="email" name="email" id="email" />
    </div>
    <div>
      <label for="message">Message</label>
      <textarea rows="5" name="message" id="message" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
