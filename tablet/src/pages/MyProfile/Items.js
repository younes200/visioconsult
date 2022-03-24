const Presentation = () => (
  <ListItem icon noBorder style={[styles.listItem, styles.highlightItem]}>
    <Left>
      <Icon type="Feather" name="zap" style={styles.itemLeftIcon} />
    </Left>
    <Body>
      <Text style={styles.boldWeight}>Tell us about you !</Text>
      <Text style={styles.note}>
        A presentation is what make a difference 😉
      </Text>
    </Body>
    <Right style={styles.listItemRight}>
      <Icon name="chevron-right" style={{ color: "gray" }} />
    </Right>
  </ListItem>
);

const Hobbies = () => (
  <ListItem icon noBorder style={styles.listItem}>
    <Left>
      <Icon type="Feather" name="phone" style={styles.itemLeftIcon} />
    </Left>
    <Body>
      <Text style={styles.boldWeight}>New hobbies ?</Text>
      <Text style={styles.note}>Share it to get more accurate match 😉</Text>
    </Body>
    <Right style={styles.listItemRight}>
      <Icon name="chevron-right" style={{ color: "gray" }} />
    </Right>
  </ListItem>
);
