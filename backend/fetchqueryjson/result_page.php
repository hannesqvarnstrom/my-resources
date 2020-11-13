<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>examplesite</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar">
<img src="https://source.unsplash.com/random/80x80">
    <ul>
        <li><a href="">About us</a></li>
        <li><a href="">Products</a></li>
        <li><a href="">Pricing</a></li>
        <li><a href="">Contact</a></li>
    </ul>
</nav>
<div id="grid">
<section class="aside left">Here is some dynamic content</section>
<main>
<?=
// print_r($_GET, true);
"<script>
let query = \"";
echo $_GET["query"];
echo "\"; let resource = \"";
echo $_GET["resource"];
echo "\"; console.log(query, resource);
let promise = fetch(\"http://localhost:5501/jsonobject.json?=" . $_GET["query"] . "\");
console.log(promise);
//this doesn't seem to work, i don't know enough about this
promise.then(resp => resp.json().then(jsonval => { console.log(jsonval)}));
</script>";
?>
<!-- <h1>Welcome to our site!</h1> -->
<!-- <form method="get" action="result_page.php">
  <select name="resource"id="resource">
    <option value="comments">Comments</option>
    <option value="posts">Posts</option>
    <option value="users">Users</option>
  </select>
  <label for="query">Write your search-term</label>
  <input type="text" name="query">
  <input type="submit">
</form> -->
</main>
<section class="aside right">Here is some other dynamic content</section>
</div>
<script src="script.js"></script>
</body>
</html>
