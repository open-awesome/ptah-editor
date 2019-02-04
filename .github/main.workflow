workflow "New workflow" {
  on = "push"
  resolves = ["HTTP client"]
}

action "HTTP client" {
  uses = "swinton/httpie.action@02571a073b9aaf33930a18e697278d589a8051c1"
  args = "POST \"https://gitlab.com/api/v4/projects/10060089/mirror/pull?private_token=$GITLAB_TOKEN\""
  secrets = ["GITLAB_TOKEN"]
}
