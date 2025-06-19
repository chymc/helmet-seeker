const game = createGame({
  filter: {
    name: "crt",
    settings: {
      warp: 0.8, // Screen curvature (0 to 1)
      lineIntensity: 0.3, // Line opacity
      lineWidth: 0.5, // Line thickness
      lineCount: 100, // Number of scanlines
    },
  },
  title: ["NH", "Workplace Safety"],
  player: {
    sprite: `
              ........
              ...777..
              ..77777.
              ..77777.
              ..70707.
              .7577757
              ...555..
              ..77.77.
              `,
    position: [1, 1],
  },
  templates: {
    // robot
    h: {
      sprite: `
              ...555..
              ..56565.
              ..55555.
        ..11111.
              `,
      dialog: `oh yeah! its helmet!
        |
        no more =NO HELMET!=`,
      onCollide(target) {
        target.remove();
        game.player.sprite = `
        ........
              ...555..
              ..56565.
              ..55555.
              ..70707.
          .7577757
              ...555..
              ..77.77.
  `;
      },
    },

    w: {
      sprite: `
              111111111.
              111211211.
              .12.22.211
              .12.22.211
              .12.22.21.
              .11211211.
              .11.11.11.
              `,
    },
    m: {
      sprite: `
              444444444.
              444944944.
              .49.99.944
              .49.99.944
              .49.99.94.
              .44944944.
              .44.44.44.
              `,
    },

    1: {
      sprite: `4444444444\n4.........\n4.........\n4.........\n4.........\n4.........\n4.........\n4.........`,
      solid: false,
    },
    2: {
      sprite: `4444444444\n.........4\n.........4\n.........4\n.........4\n.........4\n.........4\n.........4`,
      solid: false,
      async onEnter(target) {
        const helmetWear = !game.getCell(1, 6).isOnScreen;
        const falseAlert = Math.floor(Math.random() * 9) > 5;
        if (helmetWear && falseAlert) {
          await game.openMessage("Wait...");
        }
        if (!helmetWear || falseAlert) {
          await game.openMessage("NO HELMET!");
          game.player.sprite = `
              ....4.....
              ..444.....
              444444..4.
              .444444444
              ..4444444.
              .44..444..
              .....44...
              .....4....
              `;
          await game.playSound("EXPLOSION");
          game.addToCell(6, 1, "e");
        }
      },
    },

    3: {
      sprite: `4.........\n4.........\n4.........\n4.........\n4.........\n4.........\n4.........\n4444444444`,
      solid: false,
    },
    4: {
      sprite: `.........4\n.........4\n.........4\n.........4\n.........4\n.........4\n.........4\n4444444444`,
      solid: false,
    },

    d: {
      sprite: `
              5........5
              4444444444
              4...44...4
              4444944444
              4...44...4
              4444444444
              4........4
              `,
      dialog: "Need a key...",
      onEnter(target) {
        game.setAll("d", {
          sprite: `
              5........5
              4........4
              4........4
              4........4
              4........4
              4........4
              4........4
              `,
        });
      },
      onLeave(target) {
        game.setAll("d", {
          sprite: `
              5........5
              4444444444
              4...44...4
              4444944444
              4...44...4
              4444444444
              4........4
              `,
        });
      },
    },

    k: {
      sprite: `
              ........
              ........
              .....555
              .....5.5 
              555555.5
              5.5..5.5
              5....555
              ........
              `,
      onCollide(target) {
        target.remove();
        game.setAll("d", {
          solid: false,
          dialog: null,
        });
      },
    },
    // wall
    x: {
      sprite: `
              666.666269
              5996669966
              6966266666
              5966699696
              6666699566
              5656699666
              56.6596669
              6966555669
              `,
    },

    // ending
    e: {
      sprite: 0,
      visable: false,
      solid: false,
      end: ["Wasted"],
    },
  },
  map: `
      xxxxxxxx
      x....12x
      x....34x
      x.k....x
      x......x
      xwmwmwdx
      xh.....x
      xxxxxxxx
      `,
  background: 0,
  dialogBackground: 1,
  dialogBorder: 0,
  dialogColor: 0,

  cellWidth: 10,
  cellHeight: 8,
  // screenWidth: 4,
  // screenHeight: 4,
  cameraWidth: 1,
  cameraHeight: 1,
});
